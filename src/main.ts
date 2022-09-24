import { globalShortcut, app, BrowserWindow } from "electron";
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
		icon: path.join(__dirname, "icon.ico")
	});


	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	if (isDev) { mainWindow.webContents.openDevTools(); localStorage.clear()}
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

app.on('browser-window-focus', () => {
    globalShortcut.register("CommandOrControl+R", () => { console.log("Shortcut Disabled"); });
    globalShortcut.register("F5", () => { console.log("Shortcut Disabled"); });
	globalShortcut.register("CommandOrControl+Shift+R", () => { console.log("Shortcut Disabled"); });
	globalShortcut.register("CommandOrControl+Shift+C", () => { console.log("Shortcut Disabled"); });
	globalShortcut.register("CommandOrControl+Shift+I", () => { console.log("Shortcut Disabled"); });
});

app.on('browser-window-blur', () => {
    globalShortcut.unregister("CommandOrControl+R");
	globalShortcut.unregister("F5");
	globalShortcut.unregister("CommandOrControl+Shift+R");
	globalShortcut.unregister("CommandOrControl+Shift+C");
	globalShortcut.unregister("CommandOrControl+Shift+I");
});
