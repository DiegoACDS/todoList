const htmlwebpackplugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        clean: true,
    },
    plugins: [
        new htmlwebpackplugin({
            title: 'Minha Todo List',
            template: 'src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],


            },
        ],
    },
}