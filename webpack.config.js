const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'scripts/dungeongeneration': './src/scripts/init.js',
    },

    devtool: 'source-map',

    devServer: {
      contentBase: './dist',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    'plugins': ['@babel/plugin-proposal-object-rest-spread'],
                },
            },
        ],
    },
    
    plugins: [
        new CleanWebpackPlugin('./dist'),

        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: path.resolve(__dirname, 'dist/assets'),
            },
            {
                from: './src/css',
                to: path.resolve(__dirname, 'dist/css'),
            },
            {
                from: './src/html',
                to: path.resolve(__dirname, 'dist'),
            },
            { 
                from: './src/vendors', 
                to: path.resolve(__dirname, 'dist/vendors'), 
            },
        ]),
    ],

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
}