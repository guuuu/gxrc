import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import Store from "electron-persist-secure/lib/store";
import path from "path";
import "./app/ipc/main";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createStores = (): void => {
	new Store({
		configName: "config",
	});
};

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		height: 720,
		width: 1280,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
		frame: false,
		resizable: false,
		//icon: path.join(__dirname, "")
	});


	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	if (isDev) { mainWindow.webContents.openDevTools(); }
};

process.on('uncaughtException', (err: Error) => {
	console.error(err.message);
})

app.on("ready", () => {

	createStores();
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
