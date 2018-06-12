var zepto  = (function(){
	
	var $,zepto = {};
	
	
	function Z (doms){
		this.length = doms.length;
		for(var i=0;i<doms.length; i++){
			this[i] = doms[i];
		}
	};
	
	
	zepto.init = function(selector){
		var element = document.querySelectorAll(selector);
		return new Z(element);
	};
	
	$ = zepto.init;
	
	$.fn = $.prototype ;
	
	$.prototype = {
		constructor: Z
	};
	return $;
})();

if(window.$ == 'undefined')

(window.$ =='undefined') && (window.$ = zepto);


$.fn.add = function (a,b){
	return a+b;
};


$.hahaha = function(){
	console.log('aaaaa');
}