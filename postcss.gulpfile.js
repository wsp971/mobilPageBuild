/**
 * 使用postcss 来写构建流程
 *
 * */

var gulp = require("gulp");

var postcss = require("gulp-postcss");

var autoprefixer = require("autoprefixer");     /*根据can i use 数据和 配置添加相应的 浏览器前缀*/

var colorRgbaFallback = require("postcss-color-rgba-fallback")   /*用来 降级处理rgba 颜色 主要兼容ie8 ，ie 11*/

var opacityFallback = require("postcss-opacity");               /* 用来降级处理 opacity  兼容ie 8 */

var pseudoelement  = require("postcss-pseudoelements")              /* 用来降级处理 伪元素 兼容ie8  ie8 不支持 :: 只支持  :*/

var pixrem = require("pixrem");                         /* 对 rem 做降级处理   兼容ie8 ie 8 不支持rem*/



var cssnext = require("cssnext");
var precss = require("precss");








var peoption =  {
	selectors: [
		'hover',
		'focus',
		'active',
		'before',
		'after',
		'ms-expand',
		'not',
		'first-child',
		'last-child'
	],
	single: true// default
};

var processors = [
	autoprefixer({ remove: false }),
	colorRgbaFallback(),
	opacityFallback,
	pseudoelement(peoption),
	pixrem
];





gulp.task("postcss", function(){
	var processors = [
		autoprefixer()
	];
	
	return gulp.src(["./css/**/*.css"])
	.pipe(postcss(processors))
	.pipe(gulp.dest("./css/postcss/"));
	
});


gulp.task("test", function(){
	return gulp.src("./css/practice/*.css").pipe(postcss(processors)).pipe(gulp.dest("./css/postcss/"));
});

