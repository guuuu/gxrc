import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import KeyCard from "./KeyCard"
import { MyChampionsState } from "./States/MyChampionsState";
import { SelectedChampState } from "./States/SelectedChampState";

const RuneCards = (): JSX.Element => {
    const [selectedChamp, setSelectedChamp] = useRecoilState(SelectedChampState);
    const [myChampions, setMyChampions] = useRecoilState<IChampionRunes[]>(MyChampionsState);

    const DefaultCards = ["top", "jungle", "mid", "adc", "support"]

    return(
        <div className="w-full h-40 relative mt-10">
            <div className="absolute w-40 h-custom_scrollable_height flex flex-col overflow-y-scroll overflow-x-hidden items-center origin-top-left translate-y-40 -rotate-90">
                {
                    // SelectedChampion.isDefault
                    // ? DefaultCards.map((item, key) => { return( <KeyCard text={item.toString()} key={key}/> ) })
                    // :
                    myChampions.map((champ, key) => {
                        //console.log(champ.champion.name,champ.champion.id === selectedChamp.cid,champ.champion.id , selectedChamp.cid);
                        if(champ.champion.id == selectedChamp.cid){
                            console.log(key);
                            return( <KeyCard text={champ.name} runes={champ.runes} key={key} select={key === 0 ? true : false}/> )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default RuneCards;