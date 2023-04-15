// Node-Module
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// CommonJS : Node App
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]',
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
        }),
    ],
};
