import { useState } from "react"
import RunesModal from "./RunesModal"

const AddCustomRunes = (): JSX.Element => {
    const [open, setOpen] = useState(false);

    const modalState = () => { setOpen(!open) }

    return(
        <>
            <RunesModal f={modalState} isOpen={open} />
            <div className="w-full h-full text-white text-center flex justify-center items-center text-lg" onClick={() => { setOpen(!open) }}>
                <span className="w-full h-full bg-bt1 scale-100  hover:scale-105 ease-in duration-75 hover:cursor-pointer flex items-center justify-center rounded-md">Add new runes</span>
            </div>
        </>
    )
}

export default AddCustomRunes;