const Minimize = () => {
    return(
        <>
            <div className="absolute -top-5 -right-2 m-6 w-7 h-7 scale-100 hover:scale-110 hover:cursor-pointer ease-in duration-75" onClick={() => { window.electron.minimize(); }}>
                <div className="absolute bottom-0 right-0 w-7 h-1 bg-white"></div>
            </div>
        </>
    )
}

export default Minimize;