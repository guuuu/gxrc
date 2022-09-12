import { atom } from "recoil"

export const SidebarActiveState = atom<{"id": number, "status": boolean}>({
    "key": "SBAS",
    "default": {
        "id": 1,
        "status": true
    }
});