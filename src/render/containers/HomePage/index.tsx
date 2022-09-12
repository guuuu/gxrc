import Sidebar from "./Components/Sidebar/Sidebar";
import MainContent from "./Components/MainContent";
import Minimize from "./Components/Minimize";
import Modal from "./Components/Modal";
import React from "react";
import { RecoilRoot, useRecoilState } from "recoil";

const HomePage = () => {
	return (
		<>
			<main className="w-screen h-screen bg-main_bg flex flex-row">
				<RecoilRoot>
					<Sidebar />
					<MainContent />
					<Minimize />
					<Modal />
				</RecoilRoot>
			</main>
		</>
	);
};

export default HomePage;
