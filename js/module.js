

/** 记录模块的对象*/
var M = {};


/** require 函数， 引入模块
 * @param id {string}
 * @return {Object}
 * */
var require= function (id){
	if(!M[id]){
		M[id] = {
			exports : {}
		};
	}
	return M[id];
};


/** define 函数定义模块
 *
 * @param  id {string}
 * @param  fun {function}
 *
 * */
var define = function(id, fun){
	
	M[id] = {
		exports : {}
	};
	var o = fun(require, M[id].exports, M[id]);
	M[id] = o || M[id].exports;
};






