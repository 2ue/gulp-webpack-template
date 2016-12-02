/*
* @Author: eryue
* @Date: 2016-11-10 16:15:31
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-02 16:59:06
* @Function:
* @Description:
*/

'use strict';

let path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin');
    // fileObj = require('./build/entryfile.js')(HtmlWebpackPlugin);


//获取多页面的每个入口文件，用于配置中的entry
const fileObj = (() => {
    const srcDir = path.resolve(process.cwd(), 'src'), //css/js/images等资源入口
        htmlPath = path.resolve(srcDir, 'views'), //html资源入口
        dirs = fs.readdirSync(htmlPath),
        ignoreFile = ['test'], //不进行打包的html
        fileObj = {
            entryFiles: {}, //入口文件
            htmlAppendJsObj: [] //自动添加js到html配置集合
        };

    dirs.map((item, index) => {
        const matchFile = item.match(/(.+)\.html$/),
            isIgnore = ignoreFile.indexOf(matchFile[1]) == -1,
            chunkFileName = 'page/' + matchFile[1];

        if(!matchFile || !isIgnore) return;
        fileObj.entryFiles[chunkFileName] = path.resolve(srcDir, 'js/' + chunkFileName + '.js');
        fileObj.htmlAppendJsObj.push(
            new HtmlWebpackPlugin({
              filename: '../views/' + item,
              template: 'src/views/' + item,
              chunks: ['common/common.js',chunkFileName],
              inject: 'body'
            })
        );
    })
    return fileObj;
})();

module.exports = {

    cache: true,
    // devtool: 'cheap-module-eval-source-map', //配置生成Source Maps，选择合适的选项
    //页面入口文件配置
    entry: fileObj.entryFiles,
    //出口文件输出配置
    output: {
        path: path.join(__dirname, "dist/js"), //webpack启动时需要
        // publicPath: path.join(__dirname, "src/js/page/"),
        filename: "[name].js", //[name]指向entry中'app',对应关系
        chunkFilename: "[chunkhash].js"
    },
    //插件项
     plugins: [
        new CommonsChunkPlugin('common/common.js'),
        //js开启压缩
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ].concat(fileObj.htmlAppendJsObj),
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
        extensions: ['', '.js', '.json', '.scss', '.vue'],
        // alias: {
            //映射vue，不然require vue后会报错 参考https://segmentfault.com/q/1010000007071229
            'vue$': 'vue/dist/vue.js'
        //     jquery: srcDir + "/js/common/jquery-1.9.1.mim.js",
        //     core: srcDir + "/js/core",
        //     ui: srcDir + "/js/ui"
        // }
    },
    devServer: {
        contentBase: "./views",//本地服务器所加载的页面所在的目录
        port: 63342,
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }

};