import SidebarBT from "./SidebarBT"
import React from "react";
import DefaultRunes from "../DefaultRunes";
import MyRunes from "../MyRunes";
import SidebarBTv2 from "./SidebarBTv2";
import help_icon from "../../../../../../assets/help.svg"
import info_icon from "../../../../../../assets/info.svg"
import { useRecoilState } from "recoil";
import { RuneTypeState } from "../States/RuneTypeState"


const Sidebar = () => {
    const [RuneType, SetRuneType] = useRecoilState(RuneTypeState)

    window.electron.getRunes();

    return(
        <>
            <div className="h-screen w-1/4 bg-sidebar_bg flex flex-col relative justify-center">
                <div className="absolute top-0 left-0 w-full h-16 text-xl flex flex-row z-10 my-3 bg-sidebar_bg">
                    <div className="w-1/2 h-full">
                        <SidebarBT text="Default Runes" state={true} id={1} />
                    </div>
                    <div className="w-1/2 h-full">
                        <SidebarBT text="My Runes" state={false} id={2} />
                    </div>
                </div>

                <div className="text-white w-full h-[calc(100%-(2*4rem))] overflow-y-scroll">
                    { RuneType ? (<DefaultRunes />) : (<MyRunes />) }
                </div>

                <footer className="absolute bottom-0 w-full h-16 text-xl flex flex-row z-10 my-3 bg-sidebar_bg">
                    <div className="w-1/2 h-full">
                        <SidebarBTv2 image={info_icon} content={
                            {
                                "title": "About",
                                "content": (
                                    <>
                                        <div className="w-full h-full flex flex-col mt-8 text-gray-700 justify-center">
                                            <p className="my-2">Developer: <span className="text-blue-400 hover:cursor-pointer" onClick={() => {
                                                window.electron.openUrl("https://guuuu.github.io/gxdev")
                                            }}> GxDev </span> 📍</p>
                                            <p className="my-2">Source: <span className="text-blue-400 hover:cursor-pointer" onClick={() => {
                                                window.electron.openUrl("https://github.com/guuuu/GXSH")
                                            }}>Github</span> 👾</p>
                                        </div>
                                        <div className="w-full h-20 border-t-2 mt-8 border-gray-200 flex justify-center items-center text-center text-xs text-gray-500 overflow-hidden">
                                            <p>
                                                GXRC isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc
                                            </p>
                                        </div>
                                    </>
                                )
                            }
                        }/>
                    </div>
                    <div className="w-1/2 h-full">
                        <SidebarBTv2 image={help_icon} content={
                            {
                                "title": "Need help?",
                                "content": (
                                    <>
                                        <p className="text-sm text-gray-500"> </p>
                                    </>
                                )
                            }
                        }/>
                    </div>
                </footer>
            </div>
        </>

    )
}


export default Sidebar;