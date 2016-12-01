/*
* @Author: eryue
* @Date: 2016-11-10 16:15:31
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-21 17:32:01
* @Function:
* @Describtion:
*/

'use strict';

var fs = require("fs");
var Mock = require('mockjs'); //数据模拟

var isDev = true; //true调试环境 | false线上环境
var resultPath = isDev ? './src/' : './dist/';
var dataPathName = 'data'; //数据保存路径名称
var data = Mock.mock({
    // 属性 selectList 的值是一个数组，其中含有 1 到 20 个元素
    'selectList|3-8': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'value': '@name',
        'text': '@cname'
    }]
});

var data = JSON.stringify(data, null, 4);

fs.readdir(resultPath,function(err, files){//读取目录，用于判断即将创建的目录是否存在
    var toMkdir = true; //新建目录标记，true新建，fasle表示已存在则不新建
    if (err) {
        console.log("读取目录失败！");
        return console.error(err);
    }
    files.forEach( function (file,index){
        if(file == dataPathName) toMkdir = false;
        // if(index < (files.length - 1)) return;
    });
    if(toMkdir){
        fs.mkdir(resultPath + dataPathName,function(err){
            if (err) {
                console.log("创建data目录失败！");
                return console.error(err);
            };
            console.log("创建data目录成功！");
            putInJson(resultPath + dataPathName);

        });
    }else {
        console.log(resultPath + dataPathName + "目录已存在！");
        putInJson(resultPath + dataPathName);
    };

});

function putInJson(path) {
    var writerStream = fs.createWriteStream(path + '/selectList.json'); // 创建一个可以写入的流，写入到文件 output.txt 中
    writerStream.write(data,'UTF8'); // 使用 utf8 编码写入数据
    writerStream.end(); // 标记文件末尾
    writerStream.on('finish', function() {// 处理流事件 --> data, end, and error
        console.log("数据写入完成！");
    }).on('error', function(err){
        console.log(err.stack);
        console.log('数据写入失败！');
    });
};
