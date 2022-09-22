import { useRecoilState } from "recoil";
import { modalContentState } from "../States/ModalContentState";
import { modalState } from "../States/ModalState";
import { MyChampionsState } from "../States/MyChampionsState";
import { SelectedChampState } from "../States/SelectedChampState";
import { SelectedKeyCardState } from "../States/SelectedKeyCardState";
import { SelectedRunesState } from "../States/SelectedRunesState";
import { SnackbarState } from "../States/SnackBarState";

interface Props{
    "text": string,
    "action": boolean | null,
    "isDefault": boolean,
    "buildName"?: string
}

const RunesBT = (props: Props) => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState)
    const [champ, setChamps] = useRecoilState(SelectedChampState);
    const [snack, setSnack] = useRecoilState(SnackbarState);
    const [selectedKeyCard, setSelectedKeyCard] = useRecoilState(SelectedKeyCardState);
    const [open, setOpen] = useRecoilState(modalState)
    const [content, setContent] = useRecoilState(modalContentState)
    const [myChampions, setMyChampions] = useRecoilState(MyChampionsState);
    const [SelectedChampion, SetSelectedChampion] = useRecoilState<ISelectedChampion>(SelectedChampState);

    const injectRunes = (): void => {
        const to_inject: IRuneInjection = {
            "name": props.isDefault ?  `GXRC - ${champ.name}` : `GXRC - ${champ.name} - ${props.buildName}`,
            "primaryStyleId": runes.primary,
            "subStyleId": runes.sub_primary,
            "selectedPerkIds": [runes.keystone,runes.r1,runes.r2,runes.r3,runes.r4,runes.r5,runes.r6,runes.r7,runes.r8],
            "current": true,
        }

        window.electron.injectRunes(to_inject)
        .then((data) => {
            if(data.injected){
                setSnack({
                    "status": true,
                    "severity": "success",
                    "content": "Runes imported successfully"
                })
            }
        })
        .catch((error: IInjectionStatus) => {
            if(error.reason)
            {
                setSnack({
                    "status": true,
                    "severity": "error",
                    "content": error?.reason
                })
            }
        })
    }

    // const updateRunes = (): JSX.Element => {
    //     return <></>
    //     // const [open, setOpen] = useState(false);
    //     // const modalState = () => { setOpen(!open) }
    //     // return <RunesModal f={modalState} isOpen={open} />
    // }

    const deleteRunes = (): void => {
        let title: string = ""

        myChampions.forEach((champion) => {
            if(champion.uuid === selectedKeyCard){
                title = champion.champion.name + " - " + champion.name
            }
        })

        setContent({
            "title": `Delete ${title} runes?`,
            "content":
            <div className="h-auto w-full flex flex-row justify-center items-center mt-7">
                    <button className="w-44 h-10 bg-import hover:scale-105 ease-in duration-75 cursor-pointer text-white text-lg" onClick={() => {setOpen(false)}}>No</button>
                    <div className="w-10 h-full mx-1" />
                    <button className="w-44 h-10 bg-export hover:scale-105 ease-in duration-75 cursor-pointer text-white text-lg" onClick={() => {
                        if(window.electron.deleteChampion(selectedKeyCard)){
                            setOpen(false);

                            setSnack({
                                "status": true,
                                "severity": "success",
                                "content": "Rune deleted successfully"
                            })
                            const data: IChampionRunes[] = window.electron.getMyChampions()
                            setMyChampions(data);

                            if(data.length > 0){
                                SetSelectedChampion({
                                    cid: data[0].champion.id,
                                    isDefault: false,
                                    name: data[0].champion.name
                                })

                                setSelectedKeyCard(data[0].uuid)

                                setRunes({
                                    "primary": data[0].runes.primaryStyleId,
                                    "sub_primary": data[0].runes.subStyleId,
                                    "keystone": data[0].runes.selectedPerkIds[0],
                                    "r1": data[0].runes.selectedPerkIds[1],
                                    "r2": data[0].runes.selectedPerkIds[2],
                                    "r3": data[0].runes.selectedPerkIds[3],
                                    "r4": data[0].runes.selectedPerkIds[4],
                                    "r5": data[0].runes.selectedPerkIds[5],
                                    "r6": data[0].runes.selectedPerkIds[6],
                                    "r7": data[0].runes.selectedPerkIds[7],
                                    "r8": data[0].runes.selectedPerkIds[8],
                                })
                            }
                            else{
                                SetSelectedChampion({
                                    cid: -1,
                                    isDefault: false,
                                    name: ""
                                })

                                setSelectedKeyCard("")
                            }
                        }
                    }}>Yes</button>
            </div>
        })
        setOpen(!open)
    }

    if(props.action === true){
        if(props.isDefault){
            return(
                <button className="w-full h-5/6 glass  flex items-center justify-center text-white text-xl mx-3 rounded-md scale-95 hover:scale-100 ease-in duration-75" onClick={() => { injectRunes(); }}>
                    {props.text}
                </button>
            )
        }
        else{
            return(
                <button className="w-3/6 h-5/6 glass  flex items-center justify-center text-white text-xl mx-3 rounded-md scale-100 hover:scale-105 ease-in duration-75" onClick={() => { injectRunes(); }}>
                    {props.text}
                </button>
            )
        }
    }

    else if(props.action === null){
        if(!props.isDefault){
            return(
                <button className={`w-3/6 h-5/6 glass flex items-center justify-center text-white text-xl mx-3 rounded-md scale-100 hover:scale-105 ease-in duration-75 ${selectedKeyCard === "" ? 'pointer-events-none' : !SelectedChampion.isDefault ? 'pointer-events-none' : 'pointer-events-auto'}`} onClick={() => { deleteRunes(); }}>
                    {props.text}
                </button>
            )
        }
    }

    return(<></>)
}

export default RunesBT;