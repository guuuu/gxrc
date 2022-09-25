import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import AddCustomRunes from "./AddCustomRunes";
import Champion from "./Champion";
import Loading from "./Loading";
import Searchbar from "./Sidebar/Searchbar";
import {MyChampionsState} from "./States/MyChampionsState"
import { SelectedChampState } from "./States/SelectedChampState";
import { SelectedKeyCardState } from "./States/SelectedKeyCardState";
import { SelectedRunesState } from "./States/SelectedRunesState";
import { SnackbarState } from "./States/SnackBarState";

const MyRunes = () => {
    const [championName, setchampionName] = useState("");
    const [myChampions, setMyChampions] = useRecoilState<IChampionRunes[]>(MyChampionsState);
    const showedChampions: number[] = []
    const championToRender = (char: string) => { setchampionName(char); }
    // const add = (champ: IChampionRunes) => { setMyChampions(old => [...old, champ]) }
    const [flag, setFlag] = useState(true);
    const [SelectedChampion, SetSelectedChampion] = useRecoilState<ISelectedChampion>(SelectedChampState);
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [runes, setRunes] = useRecoilState(SelectedRunesState);
    const [selectedKeyCard, setSelectedKeyCard] = useRecoilState(SelectedKeyCardState);
    const [snack, setSnack] = useRecoilState(SnackbarState);

    useEffect(() => {
        if(flag){
            if(myChampions.length > 0){
                SetSelectedChampion({
                    cid: myChampions[0].champion.id,
                    isDefault: false,
                    name: myChampions[0].champion.name
                })

                setRunes({
                    "primary": myChampions[0].runes.primaryStyleId,
                    "sub_primary": myChampions[0].runes.subStyleId,
                    "keystone": myChampions[0].runes.selectedPerkIds[0],
                    "r1": myChampions[0].runes.selectedPerkIds[1],
                    "r2": myChampions[0].runes.selectedPerkIds[2],
                    "r3": myChampions[0].runes.selectedPerkIds[3],
                    "r4": myChampions[0].runes.selectedPerkIds[4],
                    "r5": myChampions[0].runes.selectedPerkIds[5],
                    "r6": myChampions[0].runes.selectedPerkIds[6],
                    "r7": myChampions[0].runes.selectedPerkIds[7],
                    "r8": myChampions[0].runes.selectedPerkIds[8],
                })

                setSelectedKeyCard(myChampions[0].uuid)

                setFlag(false);
            }
            else{
                SetSelectedChampion({
                    cid: -1,
                    isDefault: false,
                    name: ""
                })

                setSelectedKeyCard("");
            }

            setisLoading(false);
        }
    }, [flag, selectedKeyCard])

    if(isLoading){ return( <Loading />) }

    return(
        <>
            <div className="w-full h-9 bg-sidebar_bg absolute z-20" />
            <div className="w-full h-14 mt-3 flex items-center justify-center absolute z-20 bg-sidebar_bg">
                <Searchbar updateFunc={championToRender}/>
            </div>
            <div className="mt-20">
                <div className="w-full h-24 flex flex-col items-center justify-center">
                    <div className="w-full h-full p-2">
                        <AddCustomRunes />
                    </div>
                    <div className="w-full h-full flex flex-row">
                        <div className="w-1/2 h-full p-2">
                            <div className={`w-full h-full bg-import text-center rounded-md cursor-pointer hover:scale-105 ease-in duration-75 flex items-center justify-center ${myChampions.length > 0 ? '' : 'pointer-events-none grayscale-70'}`} onClick={() => { window.electron.openDialog(); }}>Export</div>
                        </div>
                        <div className="w-1/2 h-full p-2 relative ">
                            <div className="w-full h-full bg-export text-center rounded-md cursor-pointer hover:scale-105 ease-in duration-75 flex items-center justify-center relative">
                                <label className="absolute">Import</label>
                                <input type="file" className="opacity-0 cursor-pointer" accept=".json" onChange={(e) => {
                                    if(e.target.files)
                                    {
                                        if(e.target.files.length > 0){
                                            setisLoading(true);
                                            window.electron.loadFromFile(e.target.files[0].path)
                                            .then((didImport: boolean) => {
                                                if(didImport){
                                                    const data: IChampionRunes[] = window.electron.getMyChampions()
                                                    setMyChampions(data)
                                                    setSnack({
                                                        "status": true,
                                                        "severity": "success",
                                                        "content": "Runes imported successfully"
                                                    })

                                                    SetSelectedChampion({
                                                        "cid": data[0].champion.id,
                                                        "isDefault": false,
                                                        "name": data[0].champion.name
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

                                                    setisLoading(false);
                                                }
                                                else{
                                                    setSnack({
                                                        "status": true,
                                                        "severity": "error",
                                                        "content": "Runes failed to import"
                                                    })

                                                    setisLoading(false);
                                                }
                                            })
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    myChampions.length > 0 ?
                        myChampions.map((champion, key) => {
                            if(showedChampions.indexOf(champion.champion.id) !== -1){ return null}

                            if(championName.toLowerCase().trim() == ""){
                                showedChampions.push(champion.champion.id);
                                return <Champion name={champion.champion.name} id={champion.champion.id} image={champion.champion.image} isDefault={ false } key={key} />
                            }
                            if(champion.champion.name.toLowerCase().trim().includes(championName.toLowerCase())){
                                showedChampions.push(champion.champion.id);
                                return <Champion name={champion.champion.name} id={champion.champion.id} image={champion.champion.image} isDefault={ false } key={key} />
                            }
                        })
                    :
                    <div className="w-full h-96 flex items-center justify-center text-center text-white text-xl flex-wrap">You don't have custom runes saved. 😪</div>
                }
            </div>
        </>
    )
}

export default MyRunes;