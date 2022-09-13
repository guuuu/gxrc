import { useRecoilState } from "recoil";
import { MyChampionsState } from "./States/MyChampionsState";
import {SelectedChampState} from "./States/SelectedChampState";
import { SelectedKeyCardState } from "./States/SelectedKeyCardState";

interface Props{
	"name": string,
	"id": number,
	"image": string,
    "isDefault": boolean
}

const Champion = (props: Props) => {
    const [SelectedChampion, SetSelectedChampion] = useRecoilState<ISelectedChampion>(SelectedChampState);
    const [selectedKeyCardState, setSelectedKeyCardState] = useRecoilState(SelectedKeyCardState);
    const [myChampions, setMyChampions] = useRecoilState(MyChampionsState);

    return(
        <>
            <div className="w-full h-14 my-4 flex flex-row hover:champ_row_hover hover:cursor-pointer ease-in justify-center items-center" data-id={ props.id } data-isdefault={ props.isDefault } onClick={(e) => {
                const id = e.currentTarget.getAttribute("data-id");
                const isDefault = e.currentTarget.getAttribute("data-isdefault");

                SetSelectedChampion({
                    cid: parseInt(id ? id : "-1"),
                    isDefault: isDefault ? JSON.parse(isDefault) : null,
                    name: props.name
                })

                // if(!props.isDefault){
                //     myChampions.forEach((champion) => {
                //         if(champion.champion.id === props.id){
                //             setSelectedKeyCardState(champion.uuid)
                //         }
                //     })
                // }
            }}>
                <div className="w-1/6 h-full ml-2 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full relative">
                        <img src={ props.image } alt={ props.name } className="w-12 h-12 rounded-full"/>
                        <div className="frame w-14 h-14 absolute rounded-full z-10 -top-1 -left-1"></div>
                    </div>
                </div>
                <div className="w-5/6 h-full text-white text-center flex items-center ml-9">
                    { props.name }
                </div>
                <div className={`${props.id == SelectedChampion.cid ? 'w-6 h-4 bg-bt1 rounded-full float-right mr-5' : ''}`}></div>
            </div>
        </>
    )
}

export default Champion;