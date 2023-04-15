// Node-Module
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// CommonJS : Node App
module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js',
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'], //image
            },
        ],
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]',
    },
};
