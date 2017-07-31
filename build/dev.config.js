const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack html 打包模块

const webpackMerge = require('webpack-merge');

const mainConfig = require('./main.config');

const config = require('./config');

Object.keys(mainConfig.entry).forEach(function (name) {

  mainConfig.entry[name] = [__dirname + '/dev.client'].concat(mainConfig.entry[name])
})

let plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
]

config.allPath.forEach(v => {
    let childPath = v.replace(/.*\/src\/(.*)\//, '$1');

    plugins.push(new HtmlWebpackPlugin({
        //favicon: config.srcPath + '/favicon.ico',
        filename: childPath + '/index.html', 
        template: v + '/index.html', 
        inject:true,
        minify:{    //压缩HTML文件
            removeComments:true,    //移除HTML中的注释
            collapseWhitespace:true    //删除空白符与换行符
        },
        chunks: [childPath, 'polyfill'], // 需要引入的chunk，不配置就会引入所有页面的资源
    }));
});

module.exports = webpackMerge(mainConfig, {

    output: {
        path: path.join(__dirname, '../dev/'), //构建目录
        filename: '[name].js'
    },

    module: {
        rules: []
    },
    plugins: plugins

});