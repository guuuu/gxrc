import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectedRunesState } from "../States/SelectedRunesState"

interface Props{
    "id": number,
    "img": string,
    "main": boolean,
    "keystone": boolean
    "second_panel": boolean,
    "row": number
}

const RuneRow = (props: Props) => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState)

    const [sp, setSP] = useState(false);
    const [lastRow, setlastRow] = useState(-1);

    return(
        <>
            <div className="w-16 h-16 rounded-full mx-1 hover:cursor-pointer flex flex-row items-center justify-center scale-100 hover:scale-125 ease-in duration-75"
                data-id={props.id}
                onClick={() => {
                    if(props.main && !props.second_panel){
                        if(props.id === runes.sub_primary){
                            setRunes({...runes, sub_primary: -1})
                            setRunes({...runes, primary: props.id})
                        }
                        else{ setRunes({...runes, primary: props.id}) }
                    }
                    else if(props.main && props.second_panel){ setRunes({...runes, sub_primary: props.id}) }
                    else if(props.row === -1 && props.keystone){ setRunes({...runes, keystone: props.id}) }
                    else if(!props.main && !props.second_panel){
                        switch (props.row) {
                            case 0: setRunes({...runes, r1: props.id}); break;
                            case 1: setRunes({...runes, r2: props.id}); break;
                            case 2: setRunes({...runes, r3: props.id}); break;
                            default: break;
                        }
                    }
                    else if(!props.main && props.second_panel){
                        switch (props.row) {
                            case 0: setRunes({...runes, r4: props.id}); break;
                            case 1: setRunes({...runes, r5: props.id}); break;
                            case 2:
                                if(sp){
                                    setSP(!sp);
                                    setRunes({...runes, r4: props.id}); break;
                                }
                                else{
                                    setSP(!sp);
                                    setRunes({...runes, r5: props.id}); break;
                                }
                            default: break;
                        }
                    }
                    console.log(runes);
                    setlastRow(props.row);
                }} >
                <img src={props.img} alt={`${props.id}`} className={`rounded-full ${!props.keystone && !props.main ? 'w-3/4 h-3/4' : 'w-auto h-auto'}`} />
            </div>
        </>
    )
}

export default RuneRow;