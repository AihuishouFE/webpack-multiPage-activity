# webpack-multiPage-activity

# 安装

```javascript

npm install

```

# 运行

## 开发环境

> 开发环境借助 express 以及 webpack 的 热加载中间件等，会在本地开启一个node服务

> 修改代码浏览器会自动更新修改后的内容，无需人工手动

```javascript

npm run dev

```
## 构建生产包

> 生产包会针对文件进行md5 hash 校验生成文件hash

> 生产包会生成在 /dist 目录下

```javascript

npm run prod

```

# 配置

> 参数项在 /build/config.js中

```javascript

{
    srcPath:  //源码路径 String
    port: //端口 Number
    hostName: //本机域名 String
    proxy://本机代理设置 Array
}

```

> proxy 为一个多维数组， 可以配置多个代理向

```javascript
proxy: [
    [
        '/api'，//需要代理的path
        'http://www.baidu.com', //转发域名
        '/api', //是否rewrite 掉需要代理的path， 如果不需要则填写和 需要代理的path 一致，这里不需要rewrite 则最终转发为：http://www.baidu.com/api
    ],
    [
        '/api'，//需要代理的path
        'http://www.qq.com', //转发域名
        '', //这里rewrite了，则最终转发为：http://www.qq.com
    ]
]

```

# 如果遇到报错 srcWidth

* 修改 ：/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js 

147行

```javascript
if(key.startsWith(what))
		this.data.delete(key);
}
```

改为
```javascript
if(key && key.startsWith(what))
		this.data.delete(key);
}
```