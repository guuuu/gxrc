import React from "react"
import { useRecoilState } from "recoil"
import { modalState } from "../States/ModalState"
import { modalContentState } from "../States/ModalContentState"

interface Props{
    "image": string,
    "content": IModalContent
}

const SidebarBT: React.FC<Props> = (props) => {
    const [open, setOpen] = useRecoilState(modalState)
    const [content, setContent] = useRecoilState(modalContentState)

    return (
        <>
            <button className="w-full h-full text-white relative flex items-center justify-center focus:outline-none" onClick={() => {
                setContent(props.content);
                setOpen(!open)
            }}>
                <img src={props.image} alt="icon" className="w-9 h-9 scale-100 hover:scale-110" />
            </button>
        </>
    )
}

export default SidebarBT;