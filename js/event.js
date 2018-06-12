
/** 处理事件函数*/
define('event', function(require, exports, module){
    // 添加事件
    function addEvent (element, type, fn){     /** 非 ie 和 ie9*/
        if(element.addEventListener){
            element.addEventListener(type, fn, false);
        }else if(element.attachEvent){              /** ie6-ie8*/
            element.attachEvent('on' + type, fn);
        }else{
            element['on'+ type] = fn;
        }
    }
    
    // 取消默认事件
    function stopDefault(event){
        var e = arguments.callee.caller.arguments[0] || event;
        if(e&& e.preventDefault){
            e.preventDefault();
        }else{
            window.event.returnValue = false;
        }
    }
    
    //移除事件
    function delEvent(element, type, fn){
        if(element.removeEventListener){
            element.removeEventListener(type,false);
        }else if(element.detachEvent){
            element.detachEvent('on' + type, false);
        }else{
            element['on' + type] = null;
        }
    }
    
    
    //禁止事件冒泡
    function stopBubble(event){
        var e = arguments.callee.caller.arguments[0] || event;
        if(e && e.stopPropagation){
            e.stopPropagation();
        }else{
            window.event.returnValue = false;
        }
    }
    
    //模块输出方法
    module.exports = {
	    addEvent: addEvent,
	    stopDefault: stopDefault,
	    delEvent:delEvent,
	    stopBubble: stopBubble
    }
});






