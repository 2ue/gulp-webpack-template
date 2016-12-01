/**
 * Created by eryue
 * Create in 2016-11-23 14:19
 * Description: npm isntall --save-dev gulp gulp-less gulp-notify gulp-plumber gulp-watch gulp-util webpack
 */

'use strict';

require("./src/js/gen/selectList.js"); //生成随机数据 userlist

var gulp = require('gulp'),
    less = require('gulp-less'),
    //当编译less时出现语法错误或者其他异常，会终止watch事件，通常需要查看命令提示符窗口才能知道
    //所以我们需要处理出现异常并不终止watch事件（gulp-plumber），并提示我们出现了错误（gulp-notify）
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    webpackConfig = require("./webpack.config.js");

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

var RecordNum = 0;
var isDev = true;//true调试环境 | false线上环境
var resultPath = isDev ? 'src/' : 'dist/';

gulp.task('less', function() {
    RecordNum++;
    console.log('[less: ' + RecordNum + '] 次编译开始,' + resultPath + 'src/less/app.less...');
    gulp.src('src/less/app.less')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

//引用webpack对js进行操作
gulp.task("buildJs", function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("[webpack:buildJs]", err);
        gutil.log("[webpack:buildJs]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('toWatch', function() {
    gulp.watch('src/less/*.less', ['less'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('src/js/*/*.js', ['buildJs'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// 执行gulp
gulp.task('default', ['less','buildJs','toWatch']);