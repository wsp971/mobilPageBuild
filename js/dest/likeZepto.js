var M = {};

function require(id){
	return M[id] || {
		exports: {}
	};
}

function define(id, factory){
	M[id] = {
		exports: {}
	};
	var module = M[id];
	var exports = module.exports;
	M[id] = factory(require, exports, module) || module.exports;
}


/**
 * test
 * */




define("a", function(require, exports, module){
	exports.add = function(a,b){
		return a+ b;
	} ;
	exports.hello = function(){
		console.log('hello world');
	}
});

define("b", function(require, exports,module){
	var a = require('a');
	a.hello();
});








define("$", function(require, exports, module){
    /**
     * zepto核心定义
     *
     * */
    
	var zepto = (function(window){
		function Zepto(selector){
			this.select = document.querySelectorAll(selector);
			return this;
		}
	    var $ = function(query){
			var zepto = new Zepto(query);
			return zepto;
		};
		$.fn = Zepto.prototype;
		$.prototype = Zepto.prototype;
		$.prototype.constructor = Zepto;
		return $;
	})(window);
	
	// window.$ == undefined && window.$ = zepto;
	window.$ = zepto
	
	module.exports = zepto;
});

define('util', function(require, exports, module){
    var $ = require("$");
    $.fn.hasClass = function(className){
    	var flag = false;
    	 [].forEach.call(this.select, function(item){
    		flag = flag || [].indexOf.call(item.classList,className) > -1 ? true: false
	    });
        return flag;
    };
    
    $.fn.addClass = function(className){
    	[].forEach.call(this.select, function(item){
    		item.classList.add(className);
	    });
    	return this;
    };
    
    
    $.fn.append = function(html){
        [].forEach.call(this.select,function(item){
	        item.innerHTML += html;
        });
    };
    
    $.fn.html = function(html){
    	[].forEach.call(this.select,function(item){
		    item.innerHTML = html;
	    });
    };
    
    $.fn.text = function (text){
    	var textdom = document.createTextNode(text);
    	[].forEach.call(this.select,function(item){
    		item.appendChild(textdom);
	    });
		return this;
	};
	
    $.fn.before= function(dom){
    	var dom = document.createTextNode(dom);
        [].forEach.call(this.select, function(item){
        	item.insertBefore(dom,item);
        });
        return this;
	    
    };
	
	var isEmptyObject = function(Obj){
		for(var i in Obj){
			return false;
		}
		return true;
	};
});


define('classFunction', function(require, exports, module){
    var $ = require('$');
    $.isArray = function(arr){
        return arr instanceof Array;
    }
    
    $.isEmptyObject = function(Obj){
        for(var i in Obj){
            return false;
        }
        return true;
    }
    
    
});




