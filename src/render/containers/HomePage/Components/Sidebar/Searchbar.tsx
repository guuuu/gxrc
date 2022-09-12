import search_icon from "../../../../../../assets/search.png"

interface Props {
    "updateFunc": Function
}

const Searchbar = (props: Props) => {
//const Searchbar = () => {
    return(
        <>
            <div className="w-full h-14 flex flex-row text-white text-lg justify-center items-center z-50">
                <div className="w-2/12 h-full flex justify-center items-center">
                    <img src={search_icon} alt="search icon" className="object-cover h-5 rotate-90"/>
                </div>
                <div className="w-10/12 h-full flex justify-center items-center">
                    <input type="text" name="searchbar" className="w-full h-9 bg-transparent border-none focus:outline-none tracking-wider" placeholder="Search for a champion..." onKeyUp={(e) => {
                        const val = (document.querySelector("input[name='searchbar']") as HTMLInputElement).value
                        props.updateFunc(val);
                    }}/>
                </div>
            </div>
        </>
    )
}

export default Searchbar;