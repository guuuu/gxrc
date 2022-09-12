import { atom } from "recoil"

// export const SelectedRunesState = atom<IRunesLayout>({
//     "key": "SRSRS",
//     "default": {
//         "primary": -1,
//         "sub_primary": -1,
//         "keystone": -1,
//         "r1": -1,
//         "r2": -1,
//         "r3": -1,
//         "r4": -1,
//         "r5": -1,
//         "r6": -1,
//         "r7": -1,
//         "r8": -1,
//     }
// });
export const SelectedRunesState = atom<IRunesLayout>({
    "key": "SRSRS",
    "default": {
        "primary": 8300,
        "sub_primary": 8400,
        "keystone": 8351,
        "r1": 8313,
        "r2": 8345,
        "r3": 8347,
        "r4": 8451,
        "r5": 8444,
        "r6": 5007,
        "r7": 5002,
        "r8": 5001,
    }
});







