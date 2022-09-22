import { atom } from "recoil"

export const DefaultChampionRunes = atom<IChampionRunes[]>({
    "key": "DCRS",
    "default": []
});