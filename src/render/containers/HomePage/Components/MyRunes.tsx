import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import AddCustomRunes from "./AddCustomRunes";
import Champion from "./Champion";
import Loading from "./Loading";
import Searchbar from "./Sidebar/Searchbar";
import {MyChampionsState} from "./States/MyChampionsState"

const MyRunes = () => {
    const [championName, setchampionName] = useState("");
    const [myChampions, setMyChampions] = useRecoilState<IChampionRunes[]>(MyChampionsState);
    let showedChampions: number[] = []
    const championToRender = (char: string) => { setchampionName(char); }
    const add = (champ: IChampionRunes) => { setMyChampions(old => [...old, champ]) }

    return(
        <>
            <div className="w-full h-9 bg-sidebar_bg absolute z-20" />
            <div className="w-full h-14 mt-3 flex items-center justify-center absolute z-20 bg-sidebar_bg">
                <Searchbar updateFunc={championToRender}/>
            </div>
            <div className="mt-20">
                <AddCustomRunes f={add}/>
                {
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
                }
            </div>
        </>
    )
}

export default MyRunes;