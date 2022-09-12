import { atom } from "recoil"

export const SnackbarState = atom<ISnack>({
    "key": "SBS",
    "default": {
        "status": false,
        "severity": "success",
        "content": ""
    }
});