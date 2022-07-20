const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    experiments: {
        topLevelAwait: true,
    },
    entry: "./src/index.ts",
    target: "web",
    output: {
        filename: 'sword-adventure.js',
        sourceMapFilename: "[file].map",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                exclude: [path.resolve(__dirname, "node_modules/excalibur"), path.resolve(__dirname, "node_modules/@capacitor-community")],
                enforce: "pre",
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                noEmit: false,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: ['node_modules', 'src/**/*'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            title: "Sword Adventure",
            template: "src/index.html"
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/twinery-dialog/**.html", to: "twinery-dialog/[name][ext]"},
            ]
        })
    ],
};
