import { useRecoilState } from "recoil";
import { SelectedRunesState } from "./States/SelectedRunesState";
import favorite from "../../../../../assets/favorite.svg"
import favoriteFilled from "../../../../../assets/favoriteFilled.svg"
import { useEffect, useState } from "react";

interface Props{
    "text": string,
    "runes"?: IRuneInjection,
    "select": boolean
}

const KeyCard = (props: Props) => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState);
    const [favSrc, setFavSrc] = useState(favorite);
    const [once, setOnce] = useState(false);

    // useEffect(() => {
    //     setRunes({
    //         "primary": props.runes!.primaryStyleId,
    //         "sub_primary": props.runes!.subStyleId,
    //         "keystone": props.runes!.selectedPerkIds[0],
    //         "r1": props.runes!.selectedPerkIds[1],
    //         "r2": props.runes!.selectedPerkIds[2],
    //         "r3": props.runes!.selectedPerkIds[3],
    //         "r4": props.runes!.selectedPerkIds[4],
    //         "r5": props.runes!.selectedPerkIds[5],
    //         "r6": props.runes!.selectedPerkIds[6],
    //         "r7": props.runes!.selectedPerkIds[7],
    //         "r8": props.runes!.selectedPerkIds[8],
    //     })

    //     setOnce(false);
    // }, [once])

    return(
        <>
            <div className="rotate-90 glass bt-card min-w-36 w-36 min-h-24 h-24 flex justify-center items-center hover:cursor-pointer text-white my-12 scale-100 hover:scale-105 ease-in duration-75 relative z-10" onClick={(e) => {
                // const champID = parseInt(e.currentTarget.getAttribute("championid")!)
                setRunes({
                    "primary": props.runes!.primaryStyleId,
                    "sub_primary": props.runes!.subStyleId,
                    "keystone": props.runes!.selectedPerkIds[0],
                    "r1": props.runes!.selectedPerkIds[1],
                    "r2": props.runes!.selectedPerkIds[2],
                    "r3": props.runes!.selectedPerkIds[3],
                    "r4": props.runes!.selectedPerkIds[4],
                    "r5": props.runes!.selectedPerkIds[5],
                    "r6": props.runes!.selectedPerkIds[6],
                    "r7": props.runes!.selectedPerkIds[7],
                    "r8": props.runes!.selectedPerkIds[8],
                })
            }}>
                <div className={`absolute top-2 left-2 w-4 h-4 bg-bt1 rounded-full z-20 ${props.select ? 'visible' : 'hidden'}`} />
                <div className={`absolute top-1 right-1 w-6 h-6 z-20`}>
                    <img src={favSrc} alt="Favorite" onClick={() => {
                        setFavSrc(favoriteFilled)
                    }}/>
                </div>
                <span className="p-5 text-center text-ellipsis overflow-hidden">{props.text}</span>
            </div>
        </>
    )
}

export default KeyCard;