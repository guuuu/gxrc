import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs";

ipcMain.on("quit-app", () => { app.quit(); });

ipcMain.on("minimize-app", () => {
    if (process.platform === "darwin") {
        app.hide();
        return;
    }
    BrowserWindow.getFocusedWindow()?.minimize();
});


ipcMain.on("open-save-dialog", (e, runes: IChampionRunes) => {
        dialog.showSaveDialog({
            title: 'Select the file path to save',
            defaultPath: path.join(__dirname, "runes.json"),
            buttonLabel: 'Save',
            filters: [
                {
                    name: '',
                    extensions: ['json']
                }, ],
            properties: []
        }).then((file) => {
            if (!file.canceled) {
                if(file.filePath){
                    fs.writeFile(file.filePath.toString(), JSON.stringify(runes), (err) => {
                        if (err) throw err;
                    });
                }
            }
        }).catch();

})

ipcMain.on("relaunch-app", () => {
	app.relaunch();
	app.exit(0);
});
