const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json')

const hotMiddleware = 'webpack-hot-middleware/client?reload=true'

module.exports = {
    //devtool: 'eval-source-map',
    entry: {
        box: [ hotMiddleware, 'babel-polyfill', path.join(__dirname, 'src/box') ],
        demo: [ hotMiddleware, 'babel-polyfill', path.join(__dirname, 'demo') ],
        //entry: ['babel-polyfill', './app/js']
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/',
        library: '[name]',
        libraryTarget: 'umd',
        chunkFilename: "[id].chunk.js"
    },
    resolve: {
        extensions: ['', '.js','.box']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'demo/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.optimize.CommonsChunkPlugin(`common.js`)
    ],
    module: {
        loaders: [
            {
                test: /\.box$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader?plugins[]=transform-async-to-generator&presets[]=es2015&presets[]=stage-0',
                    'bitbox/transform'
                ]
            },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                "presets": ["es2015", "stage-0"],
                "plugins": ["transform-async-to-generator"]
                //"plugins": "transform-regenerator"
            }
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        }]
    },
    devServer: {
        host: '0.0.0.0'
    }
};
