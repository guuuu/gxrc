import RunesBt from "./Runes/RunesBT"
import bg_texture from "../../../../../assets/poly.svg"
import { SelectedChampState } from "./States/SelectedChampState"
import { useRecoilState } from "recoil"
import RunesLayout from "./Runes/RunesLayout"
import { useEffect, useState } from "react"
import Snackbar from "@mui/material/Snackbar/Snackbar"
import Alert from "@mui/material/Alert/Alert"
import { SnackbarState } from "./States/SnackBarState"
import RuneCards from "./RuneCards"
import { SelectedKeyCardState } from "./States/SelectedKeyCardState"

const MainContent = () => {
    const [SelectedChampion, SetSelectedChampion] = useRecoilState<ISelectedChampion>(SelectedChampState);
    const [runes, setRunes] = useState<IAPIRunes[]>([])
    const [openSnack, setOpenSnack] = useRecoilState(SnackbarState);
    const [selectedKeyCard, setSelectedKeyCard] = useRecoilState(SelectedKeyCardState)

    useEffect(() => {
        window.electron.getRunes()
        .then((data) => {
            setRunes(data)
        });
    }, [])


    return(
        <>
            <Snackbar open={openSnack.status} autoHideDuration={3000} onClose={() => { setOpenSnack({...openSnack, status: !openSnack.status})}}>
                <Alert severity={openSnack.severity} variant='filled' sx={{width: "100%", marginLeft: "-7px"}} onClose = { () => { setOpenSnack({...openSnack, status: !openSnack.status}) } }>
                    {openSnack.content}
                </Alert>
            </Snackbar>
            <main className="h-full w-3/4 relative">
                <div className="absolute w-full h-full opacity-20">
                    <img src={bg_texture} alt="" />
                </div>
                <RuneCards />
                <p className="capitalize text-white text-3xl text-center absolute w-full h-auto top-3">{SelectedChampion.name}</p>

                <div className="w-full h-96 mt-5 relative">
                    <div className="absolute w-full h-full z-10 pointer-events-none">
                        {
                            selectedKeyCard !== ""
                            ? <RunesLayout runes={runes} />
                            :
                            <div className="w-full h-full flex flex-wrap justify-center items-center text-center text-white text-2xl">
                                It's so.... empty 😞
                            </div>
                        }
                    </div>
                </div>

                <div className="w-full h-16 my-3 absolute bottom-0 flex flex-row">
                    {
                        selectedKeyCard !== ""
                        ? <>
                            <RunesBt text="Import" action={true} isDefault={ SelectedChampion.isDefault ? SelectedChampion.isDefault : false }  />
                            {/* <RunesBt text="Update" action={false} isDefault={ SelectedChampion.isDefault ? SelectedChampion.isDefault : false }/> */}
                            <RunesBt text="Delete" action={null} isDefault={ SelectedChampion.isDefault ? SelectedChampion.isDefault : false }/  >
                        </>
                        : null

                    }
                </div>
            </main>
        </>
    )
}

export default MainContent;