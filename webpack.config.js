const path = require("path");

module.exports = {
  entry: {
    SendSMSLambda: "./src/Application/Handlers/test.ts"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  externals: {
    "aws-sdk": "aws-sdk"
  },
  target: "node",
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  mode: "production"
};
