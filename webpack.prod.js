const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'builds/arnaudcasame.github.io'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Arnaud Casame',
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
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};