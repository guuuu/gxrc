import React, { useEffect } from "react";
import Champion from "./Champion";
import Loading from "./Loading";
import Searchbar from "./Sidebar/Searchbar";

const DefaultRunes = () => {
    const [Champions, setChampions] = React.useState<IChampion[] | undefined>(undefined);
    const [isLoading, setisLoading] = React.useState<boolean>(true);
    const [championName, setchampionName] = React.useState("");

    const championToRender = (char: string) => {
        setchampionName(char);
    }

    React.useEffect(() => {
        window.electron.getChampions()
        .then((resp) => {
            setChampions(resp);
            setisLoading(false);
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