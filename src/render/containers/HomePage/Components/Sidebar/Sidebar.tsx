import SidebarBT from "./SidebarBT"
import React, { useState } from "react";
import DefaultRunes from "../DefaultRunes";
import MyRunes from "../MyRunes";
import SidebarBTv2 from "./SidebarBTv2";
import help_icon from "@assets/help.svg"
import info_icon from "@assets/info.svg"
import { useRecoilState } from "recoil";
import { RuneTypeState } from "../States/RuneTypeState"


const Sidebar = () => {
    const [RuneType, SetRuneType] = useRecoilState(RuneTypeState)

    const [shouldWait, setShouldWait] = useState(false);

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
                                                window.electron.openUrl("https://github.com/guuuu/GXRC")
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
                                    <div className="w-full flex items-center justify-center flex-col">
                                        <p className="text-black text-lg font-semibold w-full pt-3">Found a bug? <span className="text-blue-400 font-normal cursor-pointer" onClick={() => {
                                            window.electron.openUrl("https://github.com/guuuu/gxrc/issues/new")
                                        }}>Report it here!</span> 🐞</p>

                                        <span className="text-black text-lg font-semibold w-full pt-3">What's the main objective of this app? <span className="text-black font-normal">To save your own runes so that you don't need to buy the expensive rune pages with BE.</span></span>
                                        <span className="text-black text-lg font-semibold w-full pt-3">Can i share my runes with friends?<span className="text-black font-normal"> Currently the best way to achieve this is to export them and send the saved file to your friends.</span></span>
                                        <span className="text-black text-lg font-semibold w-full pt-3">Are my runes saved on a cloud?<span className="text-black font-normal"> No, custom runes are saved locally, so if you ever need to uninstall the app or format your computer, export them, save the file, and impor them after again.</span></span>
                                        <span className="text-black text-lg font-semibold w-full pt-3">How does the default runes work?<span className="text-black font-normal"> It's connected to a private database with the recommended runes for each champion for his main lane.</span></span>
                                        <span className="text-black text-lg font-semibold w-full pt-3">Does GXRC collect any data?<span className="text-black font-normal"> No.</span></span>
                                        <span className="text-black text-lg font-semibold w-full pt-3">Does GXRC have ads or will have ads?<span className="text-black font-normal"> No.</span></span>
                                        <span className="text-black text-lg font-semibold w-full pt-3">Does GXRC auto-import runes?<span className="text-black font-normal"> I (the dev) always found that annoying so no, GXRC does not auto-import the runes for you.</span></span>
                                        <span className="text-black text-lg font-semibold w-full pt-3">How do I ask for a new feature?<span className="text-black font-normal"> You don't 😃 (<span className="text-xs">jk, send me an <a className="text-blue-400 cursor-pointer" href="mailto:gxdev28+gxrc@gmail.com">email</a></span>).</span></span>
                                    </div>
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