import { atom } from "recoil"

export const MyChampionsState = atom<IChampionRunes[]>({
    "key": "CRRS",
    "default": window.electron.getMyChampions()
});