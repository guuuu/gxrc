const path = require("path");
const package = require("../package.json");
require("dotenv").config();

const packageAssetsPath = path.join(__dirname, "..", "assets", "package");

module.exports = {
    packagerConfig: { asar: true, },
    publishers: [{
        name: "@electron-forge/publisher-github",
        config: {
            repository: {
                owner: "guuuu",
                name: "gxrc",
                authToken: process.env.GITHUB_TOKEN,
            },
            draft: true,
        },
    }, ],
    makers: [
        {
            packagerConfig: {
                icon: path.join(__dirname, path.join("..", path.join(".webpack", path.join("renderer", path.join("assets", path.join("package", path.join("icons", path.join("win", "icon.ico"))))))))
            },
            name: "@electron-forge/maker-squirrel",
            config: {
                setupExe: "gxRC Installer.exe",
                iconUrl: path.join(__dirname, path.join("..", path.join(".webpack", path.join("renderer", path.join("assets", path.join("package", path.join("icons", path.join("win", "icon.ico")))))))),
                setupIcon: path.join(__dirname, path.join("..", path.join(".webpack", path.join("renderer", path.join("assets", path.join("package", path.join("icons", path.join("win", "icon.ico")))))))),
                authors: "gxDev",
                loadingGif: path.join(packageAssetsPath, "loading.gif"),
            },
        },
    ],
    plugins: [
        [
            "@electron-forge/plugin-webpack",
            {
                mainConfig: "./.config/webpack.main.config.js",
                devContentSecurityPolicy: "connect-src 'self' https://ddragon.leagueoflegends.com/ 'unsafe-eval'",
                renderer: {
                    config: "./.config/webpack.renderer.config.js",
                    entryPoints: [{
                        html: "./src/render/index.html",
                        js: "./src/renderer.ts",
                        name: "main_window",
                        preload: {
                            js: "./src/preload.ts",
                        },
                    }, ],
                },
            },
        ],
    ],
};
