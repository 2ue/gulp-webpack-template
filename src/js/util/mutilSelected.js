/*
* @Author: eryue
* @Date: 2016-11-10 16:15:31
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-01 10:36:58
* @Function:
* @Description:
*/

'use strict';

var $body = $('body');

var multiSelect = function (obj){

    var _self = this;
    _self.obj = obj;
    if(!!obj) _self.initObj();

};

multiSelect.prototype = {

    constructor: multiSelect,
    initObj: function (){

        var _self = this;

        //初始化属性
        _self.selectBox = _self.obj.selectBox || '#selectBox'; //必须。标签最好为div
        _self.optionTag = _self.obj.optionTag || 'p';  //必须。插件内部不检测标签合法性
        _self.data = _self.obj.data || false;  //如果不传入data则只初始化事件
        //1.以对象的形式返回选中的条目的属性值
        //2.如果obj.data存在，则通过此属性必须能从obj.data中取得到，否则会去掉无效属性
        _self.propArr = filterProp(_self.data, _self.obj.propArr) || ['text'];
        _self.showProp = _self.obj.showProp || 'text';
        _self.selectedList = []; //盛放选中的数据
        _self.selectedClass = _self.obj.selectedClass || 'selected';
        _self.init();

    },
    init: function () {

        var _self = this;
        if(!!_self.data) _self.renderUI();  //当传入数据才初始化组件，否则只初始化事件
        _self.bindEvent();

    },
    renderUI: function (){

        var _self = this;
        var _html = '';
        $.each(_self.data, function (index1,ele1) {
            var propArrValue = ' ';
            $.each(_self.propArr, function(index2, ele2) {
                propArrValue += ele2 + '=' + ele1[ele2] + ' ';
            });
            _html += '<' + _self.optionTag + propArrValue + ' index=' + index1 + ' class="f_disselected">' + ele1[_self.showProp] + index1 + '</' + _self.optionTag + '>';
        });
        $(_self.selectBox).html(_html);

    },
    bindEvent: function () {

        var _self = this;
        var tagEle = _self.selectBox + ' ' + _self.optionTag
        var mutilSartIndex = -1, mutilEndIndex = -1;
        //mutilSartIndex == -1表示未设置开始点
        //mutilEndIndex == 0 表示未设置结束点
        $body.on('click', tagEle, function (e) {//单选
            var $this = $(this);
            var thisIndex = $this.attr('index');
            var thisOption = {};
            var isShift = e.shiftKey;
            if(mutilSartIndex != -1 && mutilEndIndex == -1 && isShift){
                mutilEndIndex = thisIndex;
                macthIndex ();
            }else {
                mutilSartIndex = thisIndex;
                macthIndex ();
            };
            if(!(mutilEndIndex != -1 && isShift)){
                if($this.hasClass(_self.selectedClass)) {
                    // _self.selectedList[thisIndex] = '';
                    delete _self.selectedList[thisIndex];
                    $this.removeClass(_self.selectedClass);
                    return;
                };
                $this.addClass(_self.selectedClass);
                $.each(_self.propArr, function(index, ele){
                    thisOption[ele] = $this.attr(ele);
                });
                _self.selectedList[thisIndex] = thisOption;
            }else {
                var $allSelect = $this.parents(_self.selectBox);
                $allSelect.find('p').removeClass(_self.selectedClass);
                _self.selectedList = {};

                for (var i = mutilSartIndex; i <= mutilEndIndex; i++) {
                    console.log(i)
                    var $thisOp = $allSelect.find('[index=' + i + ']');
                    var thisOpVal = {}
                    $thisOp.addClass(_self.selectedClass);
                    $.each(_self.propArr, function(index, ele){
                        thisOpVal[ele] = $thisOp.attr(ele);
                    });
                    _self.selectedList[i] = thisOpVal;
                    if(i == mutilEndIndex && !isShift) {
                        mutilSartIndex = mutilEndIndex;
                        mutilEndIndex = 0;
                    }
                }
            };
            console.log(_self.selectedList)
        });

        function macthIndex (){
            if(mutilSartIndex == -1 || mutilEndIndex == -1) return;
            if(mutilSartIndex > mutilEndIndex){
                var t = mutilSartIndex;
                mutilSartIndex = mutilEndIndex;
                mutilEndIndex = t;
            };
        };

    }

};

function filterProp (data, propArr) { //检测propArr是否与data内的键值匹配

    if(!data) return propArr;
    if(propArr.length == 0 || !!!propArr) propArr = ['value'];

    var newPropArr = [];
    $.each(propArr, function(index, el) {
        if(!!!data[0][el] || data[0][el]) newPropArr.push(el);
    });
    if(newPropArr.length == 0) console.log('propArr与data内属性不匹配！');
    return newPropArr;

};



module.exports = multiSelect;