/* eslint @typescript-eslint/no-var-requires: "off" */
const plugins = require("./webpack.main.plugins");

const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

//console.log("\n\n\n\n\n\n\n\n", __dirname ,"\n\n\n\n\n\n\n\n");
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main.ts",
  // Put your normal webpack config below here

  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },

  plugins: [
	new CopyPlugin({
		patterns: [
			{ from: path.join(__dirname, path.join("..", "assets")), to: path.join("..", path.join("renderer", "assets")) }
		]
	})
  ],
  //plugins: plugins,
};
