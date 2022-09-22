import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Champion from "./Champion";
import Loading from "./Loading";
import Searchbar from "./Sidebar/Searchbar";
import { DefaultChampionRunes } from "./States/DefaultChampions";
import { SelectedChampState } from "./States/SelectedChampState";
import { SelectedKeyCardState } from "./States/SelectedKeyCardState";
import { SelectedRunesState } from "./States/SelectedRunesState";

const DefaultRunes = () => {
    const [Champions, setChampions] = React.useState<IChampion[] | undefined>(undefined);
    const [isLoading, setisLoading] = React.useState<boolean>(true);
    const [championName, setchampionName] = React.useState("");
    const [defaultChampions, setDefaultChampions] = useRecoilState<IChampionRunes[]>(DefaultChampionRunes);

    const [flag, setFlag] = useState(true);
    const [SelectedChampion, SetSelectedChampion] = useRecoilState<ISelectedChampion>(SelectedChampState);
    const [runes, setRunes] = useRecoilState(SelectedRunesState);
    const [selectedKeyCard, setSelectedKeyCard] = useRecoilState(SelectedKeyCardState);

    const championToRender = (char: string) => {
        setchampionName(char);
    }

    useEffect(() => {
        window.electron.getChampions()
        .then((resp) => {
            setChampions(resp);

            window.electron.getDefaultRunes()
            .then((data) => {
                setDefaultChampions(data);
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
            })
        })

    }, []);

    if(isLoading){ return( <Loading />) }

    return(
        <>
            <div className="w-full h-9 bg-sidebar_bg absolute z-20" />
            <div className="w-full h-14 mt-3 flex items-center justify-center absolute z-20 bg-sidebar_bg">
                <Searchbar updateFunc={championToRender}/>
            </div>
            <div className="mt-20">
                {
                    Champions?.map((item, key) => {
                        if(championName.toLowerCase().trim() == ""){
                            return <Champion name={item.name} id={item.id} image={item.image} key={key} isDefault={ true } />
                        }
                        if(item.name.toLowerCase().trim().includes(championName.toLowerCase())){
                            return <Champion name={item.name} id={item.id} image={item.image} key={key} isDefault={ true } />
                        }
                    })
                }
            </div>
        </>
    )
}

export default DefaultRunes;