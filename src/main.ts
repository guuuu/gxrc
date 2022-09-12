import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import Store from "electron-persist-secure/lib/store";
import "./app/ipc/main";
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
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
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
		console.log(`Added Extension:  ${name}`);
	})
	.catch((err) => {
		console.log('An error occurred: ', err)
	});

	if (isDev) { mainWindow.webContents.openDevTools(); }
};

process.on('uncaughtException', (err: any) => {
	console.error("\n\n\n\nMAIN PROCESS\n\n\n\n" + err + "\n\n\n\n");
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
