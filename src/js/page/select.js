/*
* @Author: eryue
* @Date: 2016-11-10 16:11:59
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-01 10:32:55
* @Function:
* @Describtion:
*/

'use strict';
require('../common/jquery-2.0.3.min');
var mutilSelect = require('../util/mutilSelected');
$.ajax({
    url: '../src/data/selectList.json'
})
.done(function(data) {
    console.log(data);
    new mutilSelect ({
        selectBox: '#mutil_selected',
        optionTag: 'p',
        propArr: ['value','id'],
        showProp: 'text',
        data: data.selectList
    });
})
.fail(function() {
    console.log("error");
})
.always(function() {
    console.log("complete");
});
