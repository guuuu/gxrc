import { useRecoilState } from "recoil"
import { SidebarActiveState } from "../States/SidebarActiveState"
import { RuneTypeState } from "../States/RuneTypeState"
import { SelectedChampState } from "../States/SelectedChampState"
import { MyChampionsState } from "../States/MyChampionsState"

interface Props{
    "text": string,
    "state": boolean
    "id": number
}

const SidebarBT = (props: Props) => {
    const [active, setActive] = useRecoilState(SidebarActiveState)
    const [RuneType, setRuneType] = useRecoilState(RuneTypeState)
    const [selectedChamp, setSelectedChamp] = useRecoilState(SelectedChampState);
    const [myChampions, setMyChampions] = useRecoilState<IChampionRunes[]>(MyChampionsState);

    return (
        <>
            <button className={`${active.status && active.id === props.id ? 'sbbtactive' : ''} w-full h-full custom_underline text-white relative`} onClick={() => {
                if(props.id !== active.id){
                    setActive({...active, id: props.id, status: true})
                }
                if(props.id === 1){
                    setRuneType(true);
                    setSelectedChamp({ "cid": 266, "isDefault": true, "name": "Aatrox" })
                }
                if(props.id === 2){
                    setRuneType(false);
                    if(myChampions.length > 0)
                        setSelectedChamp({ "cid": myChampions[0].champion.id, "isDefault": false, "name": myChampions[0].champion.name })
                }
            }}>
                {props.text}
            </button>
        </>
    )
}

export default SidebarBT;