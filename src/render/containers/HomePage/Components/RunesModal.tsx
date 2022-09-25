import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import AutoFillCombo from './AutoFillCombo'
import RunesLayout from './Runes/RunesLayout'
import { SelectedChampState } from './States/SelectedChampState'
import { SelectedRunesState } from './States/SelectedRunesState'
import { SnackbarState } from './States/SnackBarState'
import {MyChampionsState} from "./States/MyChampionsState"
import LaneListbox from './LaneListbox'


interface Props {
    "f": (a: boolean | IChampionRunes) => void,
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
    const [lane, setLane] = useState("top");

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
        //console.log("add", runes);
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

    const sl = (lane: string) => { setLane(lane); }

    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed h-full inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-7xl h-5/6 transform overflow-hidden rounded-2xl bg-runesModal_bg p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h1" className="text-center text-2xl font-medium leading-6 text-white">
                                    Create new champion runes
                                    </Dialog.Title>

                                    <div className="w-full h-5/6 flex flex-row items-center justify-center">
                                            <div className='w-1/5 h-full flex flex-col items-center justify-center p-3'>
                                                <div className='w-full flex flex-col items-center justify-center mt-4'>
                                                    <span className='w-full h-10 text-slate-100 text-xl text-left'>Champion:</span>
                                                    <div className='w-full h-10'>
                                                        <AutoFillCombo champions={champions} />
                                                    </div>
                                                </div>
                                                <div className='w-full flex flex-col items-center justify-center mt-4'>
                                                    <span className='w-full h-10 text-slate-100 text-xl text-left'>Runes name:</span>
                                                    <input type="text" className="w-full h-10 text-white pl-3 text-left focus:outline-none bg-sidebar_bt_bg" placeholder="ex.: Full AP olaf..." onChange={(e) => { setBuildName(e.target.value) }} />
                                                <div className='w-full flex flex-col items-center justify-center mt-4'>
                                                    <span className='w-full h-10 text-slate-100 text-xl text-left'>Lane:</span>
                                                    <div className='w-full h-8'>
                                                        <LaneListbox f={sl}/>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>

                                            <div className='w-4/5 h-full'>
                                                <RunesLayout runes={apiRunes} />
                                            </div>
                                    </div>

                                    <div className='h-1/6 w-full flex flex-row items-center justify-center'>
                                        <button className='w-2/6 h-12 rounded-md border-none text-white text-2xl text-center focus:outline-none bg-save scale-100 hover:scale-105 ease-in duration-75 cursor-pointer select-none' onClick={() => {
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
                                                            // apiRunes[apiRunes.findIndex(id => id.main === runes.primary)].perks.forEach((perk) => {
                                                            //     let isPresent1: boolean = false;
                                                            //     let isPresent2: boolean = false;
                                                            //     let isPresent3: boolean = false;
                                                            //     let isPresent4: boolean = false;
                                                            //     perk.perks.forEach((subPerk) => { if(runes.keystone == subPerk.id){ isPresent1 = true } })
                                                            //     perk.perks.forEach((subPerk) => { if(runes.r1 == subPerk.id){ isPresent2 = true } })
                                                            //     perk.perks.forEach((subPerk) => { if(runes.r2 == subPerk.id){ isPresent3 = true } })
                                                            //     perk.perks.forEach((subPerk) => { if(runes.r3 == subPerk.id){ isPresent4 = true } })

                                                            //     if(!isPresent1 || !isPresent2 || !isPresent3 ||!isPresent4){
                                                            //         setSnack({
                                                            //             "status": true,
                                                            //             "severity": "error",
                                                            //             "content": "Invalid runes"
                                                            //         });
                                                            //         return
                                                            //     }
                                                            // })

                                                            // apiRunes[apiRunes.findIndex(id => id.main === runes.sub_primary)].perks.forEach((perk) => {
                                                            //     let isPresent1: boolean = false;
                                                            //     let isPresent2: boolean = false;
                                                            //     perk.perks.forEach((subPerk) => { if(runes.r4 == subPerk.id){ isPresent1 = true } })
                                                            //     perk.perks.forEach((subPerk) => { if(runes.r5 == subPerk.id){ isPresent2 = true } })

                                                            //     if(!isPresent1 || !isPresent2){
                                                            //         setSnack({
                                                            //             "status": true,
                                                            //             "severity": "error",
                                                            //             "content": "Invalid runes"
                                                            //         });
                                                            //         return
                                                            //     }
                                                            // })

                                                            const to_inject: IRuneInjection = {
                                                                "name": `GXRC - ${buildName} - ${champions[i].name}`,
                                                                "primaryStyleId": runes.primary,
                                                                "subStyleId": runes.sub_primary,
                                                                "selectedPerkIds": [runes.keystone, runes.r1, runes.r2, runes.r3, runes.r4, runes.r5, runes.r6, runes.r7, runes.r8],
                                                                "current": true,
                                                            }

                                                            const aux: IChampionRunes = {
                                                                "champion": champions[i],
                                                                "default": false,
                                                                "name": buildName,
                                                                "runes": to_inject,
                                                                "uuid": window.electron.uuid(),
                                                                "lane": lane
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
                                                }}> Save </button>
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