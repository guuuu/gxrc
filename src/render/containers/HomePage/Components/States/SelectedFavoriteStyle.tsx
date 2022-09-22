import { atom } from "recoil"

export const SelectedFavoriteState = atom<IFavoriteCard>({
    "key": "FCS",
    "default": {} as IFavoriteCard
});