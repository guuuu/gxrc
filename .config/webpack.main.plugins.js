// const WebpackObfuscator = require('webpack-obfuscator');

// const CopyPlugin = require("copy-webpack-plugin");
// const path = require("path");

module.exports = [
    // {
    //     plugins: [
    //         new CopyPlugin({
    //             patterns: [
    //                 { from: path.join(__dirname, path.join("..", "assets")) }
    //             ]
    //         })
    //     ]
    // }
    // {
    //     entry: './*.ts',
    //     plugins: [
    //         new WebpackObfuscator({rotateStringArray: true, reservedStrings: [ '\s*' ]}, [])
    //     ],
    //     module: {
    //         rules: [
    //             {
    //                 use: 'ts-loader',
    //                 exclude: /node_modules/,
    //             },
    //             {
    //                 enforce: 'post',
    //                 use: {
    //                     loader: WebpackObfuscator.loader,
    //                     options: {
    //                         reservedStrings: [ '\s*' ],
    //                         rotateStringArray: true
    //                     }
    //                 }
    //             }
    //         ],
    //     }
    // }
];
