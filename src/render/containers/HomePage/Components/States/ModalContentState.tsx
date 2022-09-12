import { atom } from "recoil"

export const modalContentState = atom<IModalContent>({
    "key": "modalContent",
    "default": {
        "title": "",
        "content": (<div />)
    }
});