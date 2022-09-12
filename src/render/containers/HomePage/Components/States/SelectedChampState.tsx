import { atom } from "recoil"

export const SelectedChampState = atom<ISelectedChampion>({
    "key": "SCS",
    "default": {
        cid: 266,
        isDefault: true,
        name: "Aatrox"
    }
});