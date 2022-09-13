import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import AutoFillCombo from './AutoFillCombo'
import RunesLayout from './Runes/RunesLayout'
import { SelectedChampState } from './States/SelectedChampState'
import { SelectedRunesState } from './States/SelectedRunesState'
import { SnackbarState } from './States/SnackBarState'
import {MyChampionsState} from "./States/MyChampionsState"


interface Props {
    "f": Function,
    "isOpen": boolean
}

const RunesModal = (props: Props) => {
    const [apiRunes, setApiRunes] = useState<IAPIRunes[]>([])
    const [runes, setRunes] = useRecoilState(SelectedRunesState)
    const [champions, setChampions] = useState<IChampion[]>([]);
    const [selectedChamp, setSelectedChamp] = useRecoilState(SelectedChampState);
    const [snack, setSnack] = useRecoilState(SnackbarState);
    const [open, setOpen] = useState(false);
    const [buildName, setBuildName] = useState("")
    const [myChampions, setMyChampions] = useRecoilState<IChampionRunes[]>(MyChampionsState);

    useEffect(() => {
        window.electron.getRunes()
        .then((data) => {
            setApiRunes(data)
        });

        window.electron.getChampions()
        .then((resp) => {
            setChampions(resp);
        })
    }, [])

    const addChampion = (cRunes: IChampionRunes) => {
        console.log("add", runes);
        if(window.electron.addChampion(cRunes)){
            setOpen(false);
            setSnack({
                "status": true,
                "severity": "success",
                "content": "Runes saved successfully"
            })
        }
        else{
            setSnack({
                "status": true,
                "severity": "error",
                "content": "Something went wrong"
            })
        }
    }

    function closeModal() { props.f(false) }


    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="h-full fixed inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="w-full flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-runesModal_bg p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h1" className="text-center text-2xl font-medium leading-6 text-white">
                                    Create new champion runes
                                    </Dialog.Title>

                                    <div className="mt-2">
                                        <div className="w-full h-full flex flex-col justify-center items-center ">
                                            <div className="w-full h-16 flex flex-col items-center justify-center text-white absolute top-16 z-50">
                                                <div className="w-3/4 h-full flex flex-row items-center justify-center">
                                                    <div className="text-xl text-white pr-6 pt-1">Champion: </div>
                                                    <AutoFillCombo champions={champions} />
                                                </div>
                                                <div className="my-3 w-3/6 h-8 flex flex-row justify-center items-center">
                                                    <div className="text-xl text-white pr-6 pt-1 w-1/5">Build name: </div>
                                                    <input type="text" className="w-4/5 text-white pl-3 text-left h-full focus:outline-none bg-transparent border-b-purple-400" placeholder="ex.: Full AP olaf..." onChange={(e) => {
                                                        setBuildName(e.target.value)
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="mt-16">
                                                <RunesLayout runes={apiRunes} />
                                            </div>
                                            <div>
                                                <button onClick={() => {
                                                    const selectedChampIdAux = document.querySelector("[data-customchampid]")?.attributes.getNamedItem("data-customchampid")?.nodeValue || "-1"
                                                    const selectedChampId = parseInt(selectedChampIdAux)
                                                    if (selectedChampId === -1) {
                                                        setSnack({
                                                            "status": true,
                                                            "severity": "warning",
                                                            "content": "Please select a valid champion"
                                                        });
                                                        return;
                                                    }
                                                    else {
                                                        if (buildName !== undefined) {
                                                            if (buildName.trim().length < 4) {
                                                                setSnack({
                                                                    "status": true,
                                                                    "severity": "warning",
                                                                    "content": "Runes name must have at least 4 characters"
                                                                });
                                                                return;
                                                            }
                                                            else if (buildName.trim().length > 37) {
                                                                setSnack({
                                                                    "status": true,
                                                                    "severity": "warning",
                                                                    "content": "Runes name must have at max 37 characters"
                                                                });
                                                                return;
                                                            }
                                                        }
                                                        else {
                                                            setSnack({
                                                                "status": true,
                                                                "severity": "warning",
                                                                "content": "Custom runes must have a name"
                                                            });
                                                            return;
                                                        }
                                                    }
                                                    for (let i = 0; i < champions.length; i++) {
                                                        if (parseInt(champions[i].id.toString()) === selectedChampId) {
                                                            const to_inject: IRuneInjection = {
                                                                "name": `GXRC - ${buildName} - ${champions[i].name}`,
                                                                "primaryStyleId": runes.primary,
                                                                "subStyleId": runes.sub_primary,
                                                                "selectedPerkIds": [runes.keystone, runes.r1, runes.r2, runes.r3, runes.r4, runes.r5, runes.r6, runes.r7, runes.r8],
                                                                "current": true,
                                                            }
                                                            console.log("inject", to_inject);

                                                            const aux: IChampionRunes = {
                                                                "champion": champions[i],
                                                                "default": false,
                                                                "name": buildName,
                                                                "runes": to_inject,
                                                                "uuid": window.electron.uuid()
                                                            }

                                                            props.f(aux);
                                                            addChampion(aux);
                                                            setSelectedChamp({
                                                                "cid": champions[i].id,
                                                                "isDefault": false,
                                                                "name": champions[i].name
                                                            })
                                                            setMyChampions(window.electron.getMyChampions());
                                                            break;
                                                        }
                                                    }
                                                }}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default RunesModal;