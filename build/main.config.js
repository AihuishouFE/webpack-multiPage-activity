const path = require('path');

const webpack = require('webpack');

const config = require('./config');

const CopyWebpackPlugin = require('copy-webpack-plugin');

let entries = {};

config.allPath.forEach(v => {
    let childPath = v.replace(/.*\/src\/(.*)\//, '$1');
    entries[childPath] = [v + 'app.js'];
});

entries['polyfill'] = ['babel-polyfill'];

module.exports = {
    entry: entries,
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    { 
                        loader: 'url-loader',
                        options: {
                            limit: 6000,
                            name: '[name].[ext]?[hash]'
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { 
                        loader: 'style-loader'
                    },
                    { 
                        loader: 'css-loader'
                    },
                    { 
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.art$/,
                use: [
                    {
                        loader: 'art-template-loader'
                    }
                ]
            }
        ]
    },

    resolve: {

        //配置别名，在项目中可缩减引用路径
        alias: {
          util: __dirname + '/../src/utils/index.js',
          model: __dirname + '/../src/model/index.js',
          config: __dirname + '/../src/config/index.js',
        }
    },
    plugins: [
        //将公共代码抽离出来合并为一个文件
        new webpack.optimize.CommonsChunkPlugin({name:['polyfill'],minChunks:Infinity})
    ]
};
