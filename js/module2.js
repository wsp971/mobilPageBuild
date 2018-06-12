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

