const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
});
