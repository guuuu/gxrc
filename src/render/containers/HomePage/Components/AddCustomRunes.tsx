import { modalState } from "./States/ModalState"
import { modalContentState } from "./States/ModalContentState"
import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"
import RunesLayout from "./Runes/RunesLayout"
import { SelectedRunesState } from "./States/SelectedRunesState"
import AutoFillCombo from "./AutoFillCombo"
import { SelectedChampState } from "./States/SelectedChampState"
import { SnackbarState } from "./States/SnackBarState"

interface Props{
    "f": Function
}

//! Quando add segundo champion, fica com as runas do primeiro adicionado, e o primeiro fica com as runas default

const AddCustomRunes = (props: Props): JSX.Element => {
    const [open, setOpen] = useRecoilState(modalState)
    const [content, setContent] = useRecoilState(modalContentState)
    const [apiRunes, setApiRunes] = useState<IAPIRunes[]>([])
    const [runes, setRunes] = useRecoilState(SelectedRunesState)
    const [champions, setChampions] = useState<IChampion[]>([]);
    const [selectedChamp, setSelectedChamp] = useRecoilState(SelectedChampState);
    const [snack, setSnack] = useRecoilState(SnackbarState);

    let customRunes = {} as IChampionRunes;

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

    const addChampion = (runes: IChampionRunes) => {
        if(window.electron.addChampion(runes)){
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

    return(
        <>
            <div className="w-full h-14 text-white text-center flex justify-center items-center text-4xl hover:cursor-pointer hover:bg-sidebar_bt_bg" onClick={() => {
                setContent({
                    "title": "Create new champion runes",
                    "content": <>
                        <div className="w-full h-full flex flex-col justify-center items-center ">
                            <div className="w-full h-16 flex flex-col items-center justify-center text-black absolute top-16 z-50">
                                <div className="w-3/4 h-full flex flex-row items-center justify-center">
                                    <div className="text-xl text-black pr-6 pt-1">Champion: </div>
                                    <AutoFillCombo champions={champions}/>
                                </div>
                                <div className="my-3 w-5/6 h-8">
                                    <input type="text" className="text-black text-center w-full h-full focus:outline-none" placeholder="ex.: Full AP olaf..." onChange={(e) => {
                                        customRunes.name = e.target.value;
                                    }}/>
                                </div>
                            </div>
                            <div className="mt-16">
                                <RunesLayout runes={apiRunes}/>
                            </div>
                            <div>
                                <button onClick={() => {
                                    const selectedChampIdAux = document.querySelector("[data-customchampid]")?.attributes.getNamedItem("data-customchampid")?.nodeValue || "-1"
                                    const selectedChampId = parseInt(selectedChampIdAux)

                                    if(selectedChampId === -1){
                                        setSnack({
                                            "status": true,
                                            "severity": "warning",
                                            "content": "Please select a valid champion"
                                        });
                                        return;
                                    }
                                    else{
                                        if(customRunes.name !== undefined){
                                            if(customRunes.name.trim().length < 4 ){
                                                setSnack({
                                                    "status": true,
                                                    "severity": "warning",
                                                    "content": "Runes name must have at least 4 characters"
                                                });
                                                return;
                                            }
                                            else if(customRunes.name.trim().length > 37 ){
                                                setSnack({
                                                    "status": true,
                                                    "severity": "warning",
                                                    "content": "Runes name must have at max 37 characters"
                                                });
                                                return;
                                            }
                                        }
                                        else{
                                            setSnack({
                                                "status": true,
                                                "severity": "warning",
                                                "content": "Custom runes must have a name"
                                            });
                                            return;
                                        }
                                    }

                                    for (let i = 0; i < champions.length; i++) {
                                        if(parseInt(champions[i].id.toString()) === selectedChampId){
                                            const to_inject: IRuneInjection = {
                                                "name": `GXRC - ${customRunes.name} - ${champions[i].name}`,
                                                "primaryStyleId": runes.primary,
                                                "subStyleId": runes.sub_primary,
                                                "selectedPerkIds": [runes.keystone,runes.r1,runes.r2,runes.r3,runes.r4,runes.r5,runes.r6,runes.r7,runes.r8],
                                                "current": true,
                                            }

                                            // customRunes.runes = runes;
                                            customRunes.runes = to_inject;
                                            customRunes.default = false;
                                            customRunes.champion = champions[i];
                                            customRunes.uuid = window.electron.uuid()
                                            break;
                                        }
                                    }
                                    props.f(customRunes);
                                    addChampion(customRunes);
                                    setSelectedChamp({
                                        "cid": customRunes.champion.id,
                                        "isDefault": false,
                                        "name": customRunes.champion.name
                                    })

                                }}>Save</button>
                            </div>
                        </div>
                    </>
                });
                setOpen(!open)
            }}>
                <span>+</span>
            </div>
        </>
    )
}

export default AddCustomRunes;