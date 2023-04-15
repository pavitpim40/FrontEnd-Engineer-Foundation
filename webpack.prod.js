const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
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
