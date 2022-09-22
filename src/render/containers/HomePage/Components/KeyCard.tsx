import { useRecoilState } from "recoil";
import { SelectedRunesState } from "./States/SelectedRunesState";
// import favorite_img from "../../../../../assets/favorite.svg"
// import favoriteFilled_img from "../../../../../assets/favoriteFilled.svg"
import { useState } from "react";
import { SelectedKeyCardState } from "./States/SelectedKeyCardState";
// import { MyChampionsState } from "./States/MyChampionsState";
// import { SelectedFavoriteState } from "./States/SelectedFavoriteStyle";
import { SelectedChampState } from "./States/SelectedChampState";

import topIcon from "../../../../../assets/lanes/TOP.png"
import middleIcon from "../../../../../assets/lanes/MIDDLE.png"
import adcIcon from "../../../../../assets/lanes/ADC.png"
import supportIcon from "../../../../../assets/lanes/SUPPORT.png"
import jungleIcon from "../../../../../assets/lanes/JUNGLE.png"

interface Props{
    "text": string,
    "runes"?: IRuneInjection,
    "uuid": string,
    "lane"?: string
}

const KeyCard = (props: Props) => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState);
    // const [favSrc, setFavSrc] = useState(favorite_img);
    const [once, setOnce] = useState(false);
    const [selectedKeyCard, setSelectedKeyCard] = useRecoilState(SelectedKeyCardState);
    const [selectedChamp, setSelectedChamp] = useRecoilState(SelectedChampState)
    // const [favorite, setFavorite] = useRecoilState(SelectedFavoriteState)

    // useEffect(() => {
    //     window.electron.getFavorite().forEach((fav: IFavoriteCard) => {
    //         if(fav.id === selectedChamp.cid){
    //             setFavorite(fav)
    //         }
    //     })
    // }, [])

    return(
        <>
            <div data-uuid={props.uuid} className={`rotate-90 glass bt-card min-w-36 w-36 min-h-24 h-24 flex justify-center items-center hover:cursor-pointer text-white my-12 hover:scale-105 ease-in duration-75 relative z-10 ${props.uuid === selectedKeyCard ? 'opacity-100 scale-105' : 'opacity-60 scale-90'}`} onClick={(e) => {
                if(props.runes){
                    setRunes({
                        "primary": props.runes.primaryStyleId,
                        "sub_primary": props.runes.subStyleId,
                        "keystone": props.runes.selectedPerkIds[0],
                        "r1": props.runes.selectedPerkIds[1],
                        "r2": props.runes.selectedPerkIds[2],
                        "r3": props.runes.selectedPerkIds[3],
                        "r4": props.runes.selectedPerkIds[4],
                        "r5": props.runes.selectedPerkIds[5],
                        "r6": props.runes.selectedPerkIds[6],
                        "r7": props.runes.selectedPerkIds[7],
                        "r8": props.runes.selectedPerkIds[8],
                    })
                }

                setSelectedKeyCard(props.uuid)
            }}>
                <div className={`absolute top-2 left-2 w-4 h-4 bg-bt1 rounded-full z-20 ${props.uuid === selectedKeyCard ? 'visible' : 'hidden'}`} />

                <div className={`absolute top-2 right-2 w-5 h-5 rounded-full z-20`} >
                    <img
                        src={props.lane === "top" ? topIcon: props.lane === "middle" ? middleIcon : props.lane === "adc" ? adcIcon : props.lane === "support" ? supportIcon : props.lane === "jungle" ? jungleIcon : ""}
                        alt={props.lane === "top" ? "top": props.lane === "middle" ? "middle" : props.lane === "adc" ? "adc" : props.lane === "support" ? "support" : props.lane === "jungle" ? "jungle" : ""}
                    />
                </div>
                {/* <div className={`absolute top-1 right-1 w-6 h-6 z-20`}>
                    <img src={`${props.uuid === favorite.uuid ? favoriteFilled_img : favorite_img}`} alt="Favorite" onClick={() => {
                        window.electron.addFavorite({
                            "id": selectedChamp.cid,
                            "uuid": props.uuid
                        })
                        setFavorite({
                            "id": selectedChamp.cid,
                            "uuid": props.uuid
                        })
                    }}/>
                </div> */}
                <span className="p-5 text-center text-ellipsis overflow-hidden tracking-wider">{props.text}</span>
            </div>
        </>
    )
}

export default KeyCard;