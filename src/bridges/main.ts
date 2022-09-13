import {
	ipcRenderer,
	contextBridge,
	shell,
	OpenExternalOptions,
} from "electron";
import { createStoreBindings } from "electron-persist-secure/lib/bindings";
import { authenticate, createHttp1Request } from 'league-connect'

import axios from "axios"
import nodeCache from "node-cache"

import {v4 as uuidv4} from "uuid"

const cache = new nodeCache({ stdTTL: 3600, checkperiod: 600, deleteOnExpire:true})

export const electronBridge = {
	injectRunes: (body: IRune): Promise<IInjectionStatus> => {
		return new Promise<IInjectionStatus>((resolve, reject) =>  {
			authenticate()
			.then((credentials) => {
				createHttp1Request({method: "GET", url: "/lol-champ-select/v1/session"}, credentials)
				.then((data) => {
					if(data.status === 200){
						createHttp1Request({ method: 'GET', url: '/lol-perks/v1/currentpage' }, credentials)
						.then((response) => {
							const current_rune_page = JSON.parse(response["_raw"])["id"]
							createHttp1Request({ "method": "DELETE", "url": `/lol-perks/v1/pages/${current_rune_page}` }, credentials)
							.then(() => {
								createHttp1Request({ "method": "POST", "url": "/lol-perks/v1/pages", "body": body }, credentials)
								.then(() => { resolve({injected: true}) })
								.catch((error) => { reject({"reason": `${error}`.split(":")[1], "injected": false}) })
							})
							.catch((error) => { reject({"reason": `${error}`.split(":")[1], "injected": false}) })
						})
						.catch((error) => { reject({"reason": `${error}`.split(":")[1], "injected": false}) })
					}
					else{ reject({ "reason": "User not on champ select.", "injected": false }) }
				})
				.catch((error) => { reject({ "reason": `${error}`, "injected": false }) })
			})
			.catch((error) => { reject({"reason": `${error}`.split(":")[1], "injected": false}) })
		})
	},

	getChampions: (): Promise<IChampion[]> => {
		let final: IChampion[] = [];

		return new Promise<IChampion[]>((resolve) => {
			const readFromCache: string | undefined = cache.get("champions");
			if(readFromCache !== undefined){
				resolve(JSON.parse(readFromCache))
			}
			else{
				axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
				.then((versions) => {
					const game_version = versions["data"][0];
					axios.get(`https://ddragon.leagueoflegends.com/cdn/${game_version}/data/en_US/champion.json`)
					.then((champions) => {
						Object.keys(champions["data"]["data"]).forEach((champ) => {
							final.push({
								"name": champions["data"]["data"][champ]["id"],
								"id": champions["data"]["data"][champ]["key"],
								"image": `https://ddragon.leagueoflegends.com/cdn/${game_version}/img/champion/${champ}.png`
							});
						});

						cache.set("champions", JSON.stringify(final))

						resolve(final)
					})
				})
			}
		})
	},

	minimize: (): void => {
		ipcRenderer.send("minimize-app");
	},

	getRunes: (): Promise<IAPIRunes[]> => {
		const final: IAPIRunes[] = [];

		return new Promise<IAPIRunes[]>((resolve) => {
			const readFromCache: string | undefined = cache.get("runes");
			if(readFromCache !== undefined){
				resolve(JSON.parse(readFromCache))
			}
			else{
				axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
				.then((versions) => {
					const game_version = versions["data"][0];
					axios.get(`https://ddragon.leagueoflegends.com/cdn/${game_version}/data/en_US/runesReforged.json`)
					.then((runes) => {
						runes.data.forEach((rune: any) => {
							const main = rune.id;
							const main_ico = rune.icon;
							let primary: IPerks[] = [];
							let flag: boolean = false;
							let perks: IAPIRunesPerks[] = [];

							rune.slots.forEach((perk: any) => {
								let sub_perk: IPerks[] = [];

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

						cache.set("runes", JSON.stringify(final));
						resolve(final)
					})
				})
			}
		})
	},

	openUrl: (url: string): void => { shell.openExternal(url); },

	getMyChampions: (): IChampionRunes[] => { return JSON.parse(localStorage.getItem("Saved") || "[]"); },

	uuid: (): string => { return uuidv4(); },

	addChampion: (champion: IChampionRunes): boolean => {
		let champs: IChampionRunes[] = JSON.parse(localStorage.getItem("Saved") || "[]");

		champs.push(champion);

		try {
			localStorage.setItem("Saved", JSON.stringify(champs))
			return true;
		}
		catch (error) { return false; }
	},

	deleteChampion: (uuid: string): boolean => {
		try {
			let customRunes: IChampionRunes[] = JSON.parse(localStorage.getItem("Saved") || "[]")
			customRunes.splice(customRunes.findIndex(cr => cr.uuid === uuid), 1)
			localStorage.setItem("Saved", JSON.stringify(customRunes))
			return true;
		} catch (error) { return false }
	}
};

contextBridge.exposeInMainWorld("electron", electronBridge);



export const storeBridge = createStoreBindings("config"); // "config" = the stores name

contextBridge.exposeInMainWorld("store", {
	...storeBridge,
});
