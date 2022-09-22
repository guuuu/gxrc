import { useRecoilState } from "recoil";
import RuneRow from "./RuneRow";
import SubRow from "./SubRow";
import { SelectedRunesState } from "../States/SelectedRunesState"

interface Props{
    "runes": IAPIRunes[]
    "second_panel": boolean
}

const RunePanel = (props: Props) => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState)
    const img_prefix: string = "https://ddragon.canisback.com/img/";
    // console.log(runes);

    return(
        <>
            <div className="w-full h-16 flex flex-row items-center justify-center">{
                props.runes.map((item, key) => {
                    if(props.second_panel && item.main === runes.primary){ return(<span key={key}></span>) }
                    else{
                        return(
                            <div className={`${
                                !props.second_panel
                                ?
                                    item.main !== runes.primary
                                    ? 'rune_disabled'
                                    : ''
                                :
                                    item.main !== runes.sub_primary
                                    ? 'rune_disabled'
                                    : ''
                            }`} key={key}>
                                <RuneRow id={item.main} img={`${img_prefix}${item.main_icon}`} main={true} key={key} keystone={false} second_panel={props.second_panel} row={-1} active={                                !props.second_panel
                                ?
                                    item.main !== runes.primary
                                    ? false
                                    : true
                                :
                                    item.main !== runes.sub_primary
                                    ? false
                                    : true
                                } />
                            </div>
                        )
                    }
                })
            }</div>

            {
                !props.second_panel
                ? <div className="w-full h-16 flex flex-row items-center justify-center">{
                    props.runes.map((item, key) => {
                        return(
                            <div key={key} className="flex flex-row">
                                {
                                item.primary.map((i, k) => {
                                    // console.log( "yo", i.id, runes.primary === item.main);
                                    if (runes.primary === item.main) return(
                                        <div key={k} className={`${
                                             runes.keystone !== i.id ? 'rune_disabled' : ''
                                        }`}>
                                            <RuneRow id={i.id} img={`${img_prefix}${i.icon}`} main={false} key={k} keystone={true} second_panel={props.second_panel} row={-1} active={
                                                runes.keystone !== i.id ? false : true
                                            } />
                                        </div>
                                    )
                                })
                                }
                            </div>
                        )
                    })
                }</div>
                : <></>
            }

            {
                <div className="w-full h-1/2 flex flex-col items-center justify-center">
                    {
                        props.runes.map((item, key) => {
                            if(item.main === runes.primary && !props.second_panel){
                                return ( item.perks.map((i, k) => {
                                    return ( <SubRow id={i.primary_id} rune={i} second_panel={props.second_panel} key={k} row={k} /> )
                                }) )
                            }
                            else if(item.main === runes.sub_primary && props.second_panel){
                                return ( item.perks.map((i, k) => {
                                    //console.log(i.perks);
                                    return ( <SubRow id={i.primary_id} rune={i} second_panel={props.second_panel} key={k} row={k} /> )
                                }) )
                            }
                        })
                    }
                </div>
            }
        </>
    )
}

export default RunePanel;