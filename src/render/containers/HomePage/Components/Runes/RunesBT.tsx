import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectedChampState } from "../States/SelectedChampState";
import { SelectedKeyCardState } from "../States/SelectedKeyCardState";
import { SelectedRunesState } from "../States/SelectedRunesState";
import { SnackbarState } from "../States/SnackBarState";

interface Props{
    "text": string,
    "action": boolean | null,
    "onClick"?: () => {},
    "isDefault"?: boolean
}

const RunesBT = (props: Props) => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState)
    const [champ, setChamps] = useRecoilState(SelectedChampState);
    const [snack, setSnack] = useRecoilState(SnackbarState);
    const [selectedKeyCard, setSelectedKeyCard] = useRecoilState(SelectedKeyCardState);

    const injectRunes = (): void => {
        const to_inject: IRuneInjection = {
            "name": `GXRC - ${champ.name}`,
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
                    "severity": "info",
                    "content": "Runes imported successfully"
                })
            }
        })
        .catch((error) => {
            setSnack({
                "status": true,
                "severity": "error",
                "content": error?.reason
            })
        })
    }

    const updateRunes = (): void => {
        alert("Runes updated");
        //window.electron.getChampions()
    }

    const deleteRunes = (): void => {
        if(window.electron.deleteChampion(selectedKeyCard)){
            setSnack({
                "status": true,
                "severity": "success",
                "content": "Rune deleted successfully"
            })
        }

    }

    if(props.action === true){
        if(props.isDefault){
            return(
                <button className="w-full h-5/6 glass  flex items-center justify-center text-white text-xl mx-3 rounded-md scale-90 hover:scale-100 ease-in duration-75" onClick={() => { injectRunes(); }}>
                    {props.text}
                </button>
            )
        }
        else{
            return(
                <button className="w-2/5 h-5/6 glass  flex items-center justify-center text-white text-xl mx-3 rounded-md scale-100 hover:scale-105 ease-in duration-75" onClick={() => { injectRunes(); }}>
                    {props.text}
                </button>
            )
        }
    }
    else if(props.action === false){
        if(!props.isDefault){
            return(
                <button className="w-2/5 h-5/6 glass  flex items-center justify-center text-white text-xl mx-3 rounded-md scale-100 hover:scale-105 ease-in duration-75" onClick={() => { updateRunes(); }}>
                    {props.text}
                </button>
            )
        }
    }
    else if(props.action === null){
        if(!props.isDefault){
            return(
                <button className="w-2/5 h-5/6 glass flex items-center justify-center text-white text-xl mx-3 rounded-md scale-100 hover:scale-105 ease-in duration-75" onClick={() => { deleteRunes(); }}>
                    {props.text}
                </button>
            )
        }
    }

    return(<></>)
}

export default RunesBT;