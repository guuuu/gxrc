import { useRecoilState } from "recoil"
import { SelectedRunesState } from "../States/SelectedRunesState"
import adaptiveforce from "../../../../../../assets/statmods/adaptiveforce.png"
import armor from "../../../../../../assets/statmods/armor.png"
import attackspeed from "../../../../../../assets/statmods/attackspeed.png"
import cdrscaling from "../../../../../../assets/statmods/cdrscaling.png"
import healthscaling from "../../../../../../assets/statmods/healthscaling.png"
import magicres from "../../../../../../assets/statmods/magicres.png"

const StatMods = (): JSX.Element => {
    const [runes, setRunes] = useRecoilState(SelectedRunesState)

    return(
        <>
            <div className="w-full h-16 flex flex-row items-center justify-center">
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r6 === 5008 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r6: 5008})
                }}>
                    <img src={adaptiveforce} alt="Adaptive Force" />
                </div>
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r6 === 5005 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r6: 5005})
                }}>
                    <img src={attackspeed} alt="Attack Speed" />
                </div>
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r6 === 5007 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r6: 5007})
                }}>
                    <img src={cdrscaling} alt="CDR Scaling" />
                </div>
            </div>
            <div className="w-full h-16 flex flex-row items-center justify-center">
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r7 === 5008 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r7: 5008})
                }}>
                    <img src={adaptiveforce} alt="Adaptive Force" />
                </div>
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r7 === 5002 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r7: 5002})
                }}>
                    <img src={armor} alt="Armor" />
                </div>
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r7 === 5003 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r7: 5003})
                }}>
                    <img src={magicres} alt="Magic Resist" />
                </div>
            </div>
            <div className="w-full h-16 flex flex-row items-center justify-center">
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r8 === 5001 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r8: 5001})
                }}>
                    <img src={healthscaling} alt="Health Scaling" />
                </div>
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r8 === 5002 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r8: 5002})
                }}>
                    <img src={armor} alt="Armor" />
                </div>
                <div className={`w-9 h-7 rounded-full mx-3 hover:cursor-pointer scale-100 hover:scale-110 ${runes.r8 === 5003 ? '' : 'rune_disabled'} border-2 border-orange-300`} onClick={() => {
                    setRunes({...runes, r8: 5003})
                }}>
                    <img src={magicres} alt="Magic resist" />
                </div>
            </div>
        </>
    )
}

export default StatMods;