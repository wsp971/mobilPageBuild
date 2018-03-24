var zepto = (function(){
    var $,zepto = {};
    function Z(doms){
        this.length = doms.length;
        for(var i=0;i<doms.length;i++){
            this[i] = doms[i];
        }
        return this;
    }

    zepto.Z = function(doms){
        return new Z(doms);
    };

    zepto.init = function(select){
        var inilizedoms = document.querySelectorAll(select);
        return zepto.Z(inilizedoms);
    };

    $ = function(dom){
        return zepto.init(dom);
    };
    $.fn = {
        constructor:Z
    };

    zepto.Z.prototype =  Z.prototype = $.fn;
    Z.prototype.constructor = Z;
    return $;
})();

(window.$ == undefined)&& (window.$ = zepto);


var listener = {};
$.fn.on = function(type,callback){
    if(this.addEventListener){
        this.addEventListener(type,callback,false);
    }else{

    }
    listener[type] = listener[type] || [];
    listener[type].push(callback);
};
$.fn.trigger = function(type){
    var callbacks = listener[type];
    if(callbacks[0]){
        for(callback in callbacks){
            callback.apply(Array.prototype.slice.apply(arguments.slice(1)));
        }
    }
};
