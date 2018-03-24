
var zepto = (function(){var zepto = {},$;

zepto.Z = function(dom){
    return new Z(dom);
};

var Z = function(dom){
    this.length = dom.length;
    for(var i=0;i<dom.length;i++){
        this[i] = dom[i];
    }
    return this;
};

zepto.init = function(dom){
  return zepto.Z(dom);
};

$ = function(doms){
    zepto.init(doms);
};

$.fn.constructor = zepto.Z;

zepto.Z.prototype = Z.prototype = $.fn;

return $;
})();

window.zepto  = zepto;

window.$ == undefined && window.$ = zepto;


