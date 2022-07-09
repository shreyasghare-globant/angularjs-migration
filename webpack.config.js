const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/app/main.ts",
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    mode: 'development',
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            // if you have anymore problems tweet me at @gdi2290
            // The (\\|\/) piece accounts for path separators for Windows and MacOS
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes 
        )
    ]    
};