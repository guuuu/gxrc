import { useRecoilState } from "recoil";
import RuneRow from "./RuneRow";
import { SelectedRunesState } from "../States/SelectedRunesState"

interface Props {
    "second_panel": boolean,
    "id": number,
    "rune": IAPIRunesPerks,
    "row": number
}

const img_prefix: string = "https://ddragon.canisback.com/img/";

const SubRow = (props: Props): JSX.Element => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState)

    return(
        <div className="w-full h-16 flex flex-row items-center justify-center">{
            <>{
                props.second_panel
                ?
                    props.id === runes.sub_primary
                    ?
                        props.rune.perks.map((perk, perk_key) => {
                            //console.log(props.row, perk_key);
                            if(props.row !== -1){
                                // console.log(perk.id, runes.r4, perk.id === runes.r4, "|", perk.id, runes.r5, perk.id === runes.r5);
                                return(
                                    <div key={perk_key} className={`${
                                        perk.id === runes.r4 ? 'yo' :
                                        perk.id === runes.r5 ? 'oy' : 'rune_disabled'
                                    }`}>
                                        <RuneRow id={perk.id} img={`${img_prefix}${perk.icon}`} main={false} keystone={false} second_panel={props.second_panel} row={props.row} />
                                    </div>
                                )
                            }
                        })
                    : <></>
                :
                    props.id === runes.primary
                    ?
                        props.rune.perks.map((perk, perk_key) => {
                            return(
                                <div key={perk_key} className={`${
                                    perk.id === runes.r1 ? '' :
                                    perk.id === runes.r2 ? '' :
                                    perk.id === runes.r3 ? '' : 'rune_disabled'
                                }`}>
                                    <RuneRow id={perk.id} img={`${img_prefix}${perk.icon}`} main={false} keystone={false} second_panel={props.second_panel} row={props.row} />
                                </div>
                            )

                        })
                    : <></>}</>
        }</div>
    )
}

export default SubRow;