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
        assetModuleFilename: 'images/[hash][ext][query]',
    },
};
