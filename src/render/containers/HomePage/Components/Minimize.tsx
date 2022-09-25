import closeIcon from "@assets/close.svg"

const Minimize = () => {
    return(
        <>
            <div className="absolute right-14 top-1 w-7 h-7 scale-100 hover:scale-110 hover:cursor-pointer ease-in duration-75" onClick={() => { window.electron.minimize(); }}>
                <div className="absolute bottom-0 right-0 w-7 h-1 bg-white"></div>
            </div>
            <div className="absolute right-2 top-2 w-10 h-10 overflow-hidden" onClick={() => { window.electron.quitApp(); }}>
                <img className="absolute bottom-0 right-0 w-full h-full scale-100 hover:scale-110 hover:cursor-pointer ease-in duration-75" src={closeIcon} alt="close" />
            </div>
        </>
    )
}

export default Minimize;