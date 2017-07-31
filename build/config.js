const glob = require('glob');

const srcPath = __dirname + '/../src/';//源码路径

const notRequirePath = ['utils', 'common', 'component', 'less', 'config', 'images'];

 //取得所有静态目录
let allPath = glob.sync(srcPath + "*/");

//筛选一下 去除公共路径的东西
allPath = allPath.filter(v => {

    if(/.*src\/$/.test(v)) return false;

    let jg = false;

    notRequirePath.forEach((path) => {
        if(new RegExp(path).test(v)) {
            jg = true;
        }
    });
    
    return !jg;
});


module.exports = {
    srcPath:  srcPath, //源码路径
    port: 3000,
    hostName: 'localhost',
    proxy:[],
    notRequirePath: notRequirePath,
    allPath: allPath
}