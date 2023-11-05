const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'builds/production'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Arnaud\'s Official',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {},
                    }
                ],
            },
        ],
    },
};