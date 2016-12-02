/*
* @Author: eryue
* @Date: 2016-11-10 16:15:31
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-02 10:53:20
* @Function:
* @Description: npm isntall --save-dev gulp gulp-less gulp-notify gulp-plumber gulp-watch gulp-util webpack
*/

'use strict';

require("./src/js/gen/selectList.js"); //生成随机数据 userlist

const gulp = require('gulp'),
    less = require('gulp-less'),
    //当编译less时出现语法错误或者其他异常，会终止watch事件，通常需要查看命令提示符窗口才能知道
    //所以我们需要处理出现异常并不终止watch事件（gulp-plumber），并提示我们出现了错误（gulp-notify）
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    webpackConfig = require("./webpack.config.js");

const myDevConfig = Object.create(webpackConfig);
const devCompiler = webpack(myDevConfig);

const RecordNum = 0;
const isDev = true;//true调试环境 | false线上环境
const resultPath = isDev ? 'src/' : 'dist/';

gulp.task('clean', done => {
    // console.log(gulp.src([pathSrc]))
    gulp.src('dist/')
        .pipe(clean())
        .on('end', done);
});

//拷贝图片
gulp.task('copy:images', done => {
    gulp.src(['src/images/**/*'])
        .pipe(gulp.dest('dist/data'))
        .on('end', done);
});

//拷贝数据
gulp.task('copy:data', done => {
    gulp.src(['src/data/**/*'])
        .pipe(gulp.dest('dist/data'))
        .on('end', done);
});
//编译less
gulp.task('less', done => {
    const times = RecordNum + 1;
    console.log('[less: ' + times + '次编译开始]---src/less/app.less...');
    gulp.src('src/less/app.less')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

//引用webpack对js进行操作
gulp.task("webpackBuild", callback => {
    devCompiler.run( (err, stats) => {
        if(err) throw new gutil.PluginError("[webpack:build]", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('toWatch', () => {
    gulp.watch('src/less/*.less', ['less'], event => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('src/js/*/*.js', ['webpackBuild'], event => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('src/views/*.html', ['webpackBuild'], event => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// 执行gulp
gulp.task('default', ['copy:images','copy:data','less','webpackBuild','toWatch']);