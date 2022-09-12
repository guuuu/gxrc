import RunePanel from "./RunePanel";
import StatMods from "./StatMods";

interface Props{
    "runes": IAPIRunes[]
}

const RunesLayout = (props: Props) => {

    return(
        <>
            <div className="w-full h-full flex flex-row items-center justify-center p-2">
                <div className="w-5/12 h-full flex flex-col items-center justify-center mx-2">
                    <RunePanel runes={props.runes} second_panel={false} />
                </div>

                <div className="w-5/12 h-full flex flex-col items-center justify-center mx-2">
                    <RunePanel runes={props.runes} second_panel={true} />
                </div>

                <div className="w-2/12 h-full flex flex-col items-center justify-center mx-2">
                    <StatMods />
                </div>
            </div>
        </>
    )
}

export default RunesLayout;