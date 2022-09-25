import {
	ipcRenderer,
	contextBridge,
	shell,
} from "electron";
import { createStoreBindings } from "electron-persist-secure/lib/bindings";
import { authenticate, createHttp1Request, Credentials, Http1Response } from 'league-connect'

import axios from "axios"
import nodeCache from "node-cache"

import {v4 as uuidv4} from "uuid"

import monk from "monk";

import fs from "fs"

const cache = new nodeCache({ stdTTL: 43200, checkperiod: 43200, deleteOnExpire:true})

export const electronBridge = {
	getGameVersion: (): Promise<{v: string, c: boolean}> => {

		return new Promise<{v: string, c: boolean}>((resolve) => {
			const savedVersion: string = localStorage.getItem("savedVersion") || "" ;
			const readFromCache: string | undefined = cache.get("savedVersion");

			if(readFromCache){ resolve({v: readFromCache, c: false}) }
			else{
				localStorage.setItem("savedVersion", "");
				axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
				.then((versions) => {
					if(versions){
						if(versions["data"].length > 0){
							const version: string = versions["data"][0];
							if(version !== savedVersion){
								localStorage.setItem("savedVersion", version);
								cache.set("savedVersion", version);
								resolve({v: version, c: true})
							}
							resolve({v: version, c: false})
						}
					}
				})
			}
		})
	},

	injectRunes: (body: IRune): Promise<IInjectionStatus> => {
		return new Promise<IInjectionStatus>((resolve, reject) =>  {
			authenticate()
			.then((credentials: Credentials) => {
				console.log("au");
				createHttp1Request({method: "GET", url: "/lol-champ-select/v1/session"}, credentials)
				.then((data: Http1Response) => {
					if(data.status === 200){
						createHttp1Request({ method: 'GET', url: '/lol-perks/v1/currentpage' }, credentials)
						.then((response: Http1Response) => {
							const current_rune_page: number = JSON.parse(response["_raw"])!["id"]
							createHttp1Request({ "method": "DELETE", "url": `/lol-perks/v1/pages/${current_rune_page}` }, credentials)
							.then(() => {
								createHttp1Request({ "method": "POST", "url": "/lol-perks/v1/pages", "body": body }, credentials)
								.then(() => { resolve({injected: true}) })
								.catch((error: Error) => { reject({"reason": error.message, "injected": false}) })
							})
							.catch((error: Error) => { reject({"reason": error.message, "injected": false}) })
						})
						.catch((error: Error) => { reject({"reason": error.message, "injected": false}) })
					}
					else{ reject({ "reason": "User not on champ select.", "injected": false }) }
				})
				.catch((error: Error) => { reject({ "reason": error.message, "injected": false }) })
			})
			.catch((error: Error) => { reject({"reason": error.message, "injected": false}) })
		})
	},

	getChampions: (): Promise<IChampion[]> => {
		const final: IChampion[] = [];

		return new Promise<IChampion[]>((resolve) => {
			electronBridge.getGameVersion()
			.then((version) => {
				if(!version.c && localStorage.getItem("defaultChampions")){ resolve(JSON.parse(localStorage.getItem("defaultChampions") || "[]")) }
				else{
					axios.get(`https://ddragon.leagueoflegends.com/cdn/${version.v}/data/en_US/champion.json`)
					.then((champions) => {
						Object.keys(champions["data"]["data"]).forEach((champ) => {
							final.push({
								"name": champions["data"]["data"][champ]["id"],
								"id": champions["data"]["data"][champ]["key"],
								"image": `https://ddragon.leagueoflegends.com/cdn/${version.v}/img/champion/${champ}.png`
							});
						});

						localStorage.setItem("defaultChampions", JSON.stringify(final));
						resolve(final)
					})
				}
			})
		})
	},

	minimize: (): void => { ipcRenderer.send("minimize-app"); },

	getRunes: (): Promise<IAPIRunes[]> => {
		const final: IAPIRunes[] = [];

		return new Promise<IAPIRunes[]>((resolve) => {
			electronBridge.getGameVersion()
			.then((version) => {
				if(!version.c && localStorage.getItem("runes")){ resolve(JSON.parse(localStorage.getItem("runes") || "[]")) }
				else{
					axios.get(`https://ddragon.leagueoflegends.com/cdn/${version.v}/data/en_US/runesReforged.json`)
					.then((runes) => {
						runes.data.forEach((rune: any) => {
							const main = rune.id;
							const main_ico = rune.icon;
							const primary: IPerks[] = [];
							let flag: boolean = false;
							const perks: IAPIRunesPerks[] = [];

							rune.slots.forEach((perk: any) => {
								const sub_perk: IPerks[] = [];

								if(!flag){
									flag = !flag;
									perk.runes.forEach((el: any) => {
										primary.push({
											"icon": el.icon,
											"id": el.id
										})
									});
								}
								else{
									perk.runes.forEach((el: any) => {
										sub_perk.push({
											"icon": el.icon,
											"id": el.id
										})
									})

									perks.push({
										"perks": sub_perk,
										"primary_id": main
									})
								}
							});

							final.push({
								"main": main,
								"main_icon": main_ico,
								"primary": primary,
								"perks": perks
							})
						});

						final.sort((a, b) => {
							const key1 = a.main;
							const key2 = b.main;

							if(key1 > key2) return 1
							if(key1 < key2) return -1

							return 0;
						})

						localStorage.setItem("runes", JSON.stringify(final))
						resolve(final)
					})

				}
			})
		})
	},

	openUrl: (url: string): void => { shell.openExternal(url); },

	getMyChampions: (): IChampionRunes[] => { return JSON.parse(localStorage.getItem("Saved") || "[]"); },

	uuid: (): string => { return uuidv4(); },

	addChampion: (champion: IChampionRunes): boolean => {
		const champs: IChampionRunes[] = JSON.parse(localStorage.getItem("Saved") || "[]");

		champs.push(champion);

		try {
			localStorage.setItem("Saved", JSON.stringify(champs))
			return true;
		}
		catch (error) { return false; }
	},

	deleteChampion: (uuid: string): boolean => {
		try {
			const customRunes: IChampionRunes[] = JSON.parse(localStorage.getItem("Saved") || "[]")
			customRunes.splice(customRunes.findIndex(cr => cr.uuid === uuid), 1)
			localStorage.setItem("Saved", JSON.stringify(customRunes))
			return true;
		} catch (error) { return false }
	},

	quitApp: (): void => { ipcRenderer.send("quit-app"); },

	// addFavorite: (favorite: IFavoriteCard): boolean => {
	// 	try {
	// 		let favorites: IFavoriteCard[] = JSON.parse(localStorage.getItem("Favorites") || "[]")
	// 		let added: boolean = false;

	// 		if(favorites.length > 0){
	// 			favorites.forEach((favCard) => {
	// 				if(favCard.id === favorite.id){ favCard.uuid = favorite.uuid; added = true;}
	// 				if(!added) { favorites.push(favorite) }
	// 			})
	// 		}
	// 		else{ favorites.push(favorite) }
	// 		localStorage.setItem("Favorites", JSON.stringify(favorites));
	// 		return true;
	// 	} catch (error) { return false }
	// },

	// getFavorite: (): IFavoriteCard[] => { return JSON.parse(localStorage.getItem("Favorites") || "[]") },

	getDefaultRunes: (): Promise<IChampionRunes[]> => {
		return new Promise<IChampionRunes[]>((resolve) => {
			electronBridge.getGameVersion()
			.then((version) => {
				if(!version.c && localStorage.getItem("defaultRunes")){ resolve(JSON.parse(localStorage.getItem("defaultRunes") || "[]")) }
				else{
					const conn = monk(`mongodb+srv://gxrcSoftwareReader:${process.env.MONBOPWD}@cluster.afdz1ib.mongodb.net/gxrc?retryWrites=true&w=majority`);
					const db = conn.get("runes")
					db.find({})
					.then((data) => {
						localStorage.setItem("defaultRunes", JSON.stringify(data[data.length - 1]["runes"]))
						resolve(data[data.length - 1]["runes"])
					})
					.catch((error: Error) => { console.error(error); })
				}
			})
		})
	},

	openDialog: (): void => {
		ipcRenderer.send("open-save-dialog", JSON.parse(localStorage.getItem("Saved") || "[]"))
	},

	loadFromFile: (path: string): Promise<boolean> => {
		return new Promise<boolean>((resolve) => {
			fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
				if(err){ resolve(false) }
				try {
					const arr: IChampionRunes[] = JSON.parse(data);
					if(arr.length <= 0) resolve(false);
					const saved: IChampionRunes[] = JSON.parse(localStorage.getItem("Saved") || "[]")
					saved.forEach(rune => {
						for (let i = 0; i < arr.length; i++) {
							if(arr[i].uuid === rune.uuid){
								arr.splice(i, 1);
								break
							}
						}
					});
					try {
						localStorage.setItem("Saved", JSON.stringify(saved.concat(arr)))
						resolve(true);
					} catch (error) { resolve(false); }
				} catch (error) { resolve(false); }
			})
		})
	}
};

contextBridge.exposeInMainWorld("electron", electronBridge);

export const storeBridge = createStoreBindings("config"); // "config" = the stores name

contextBridge.exposeInMainWorld("store", {
	...storeBridge,
});
