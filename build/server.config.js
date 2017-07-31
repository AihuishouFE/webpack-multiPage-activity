const config = require('./config');

const opn = require('opn');

const path = require('path');

const express = require('express');

const webpack = require('webpack');

//将http请求代理到其他服务器
var proxyMiddleware = require('http-proxy-middleware');

// 根据 Node 环境来引入相应的 webpack 配置
var webpackConfig = require('./dev.config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
var port = config.port;

// 创建1个 express 实例
var app = express()

// 根据webpack配置文件创建Compiler对象
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

//反向代理
config.proxy.forEach(function (item) {
  app.use( 
    proxyMiddleware(
      item[0], { 
        target: item[1], 
        changeOrigin: true, 
        pathRewrite: { [item[0]]: item[2] } 
      }
    )
  )
})

// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

var uri = `http://${config.hostName}:${config.port}`;

// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at ${uri} \n`)
})

// 启动express服务器并监听相应的端口
module.exports = app.listen(config.port, config.hostName, function (err) {
  if (err) {
    console.log(err)
    return
  }

 //打开浏览器
  opn(uri)
})