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
            template: 'src/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [{
                    loader: "style-loader"
                },{
                    loader: "css-loader",
                },{
                    loader: "sass-loader",
                    options: {},
                }],
            }
        ],
    },
};