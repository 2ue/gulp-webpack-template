/*
* @Author: eryue
* @Date: 2016-11-10 16:15:31
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-01 10:36:48
* @Function:
* @Description:
*/

'use strict';

var path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var srcDir = path.resolve(process.cwd(), 'src');
//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var entryFiles = {};
    var ignoreDirs = ['common','gen','util']; //不进行打包的目录

    dirs.forEach(function (item) {

        var dirsJs = fs.readdirSync(path.resolve(jsPath, item));
        if(ignoreDirs.indexOf(item) >= 0) return;
        dirsJs.forEach(function (fileItem) {
            var matchFile = fileItem.match(/(.+)\.js$/);
            if (matchFile) {
                entryFiles[item + '/' + matchFile[1]] = path.resolve(srcDir, 'js/' + item, fileItem);
            }
        })

    });

    return entryFiles;
}

module.exports = {

    cache: true,
    // devtool: 'cheap-module-eval-source-map', //配置生成Source Maps，选择合适的选项
    //插件项
    plugins: [
        new CommonsChunkPlugin('common/common.js'),
        //压缩
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    //页面入口文件配置
    entry: getEntry(),
    //出口文件输出配置
    output: {
        path: path.join(__dirname, "dist/js"), //webpack启动时需要
        publicPath: path.join(__dirname, "dist/js"),
        filename: "[name].js", //[name]指向entry中'app',对应关系
        chunkFilename: "[chunkhash].js"
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            jquery: srcDir + "/js/common/jquery-1.9.1.mim.js",
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui"
        }
    },
    devServer: {
        contentBase: "./views",//本地服务器所加载的页面所在的目录
        port: 63342,
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }

};