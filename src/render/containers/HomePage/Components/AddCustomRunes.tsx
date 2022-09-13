import { useState } from "react"
import RunesModal from "./RunesModal"

interface Props{ "f": Function }

const AddCustomRunes = (props: Props): JSX.Element => {
    const [open, setOpen] = useState(false);

    const modalState = () => { setOpen(!open) }

    return(
        <>
            <RunesModal f={modalState} isOpen={open} />
            <div className="w-full h-14 text-white text-center flex justify-center items-center text-4xl hover:cursor-pointer hover:bg-sidebar_bt_bg" onClick={() => { setOpen(!open) }}>
                <span>+</span>
            </div>
        </>
    )
}

export default AddCustomRunes;