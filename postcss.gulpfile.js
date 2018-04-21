/**
 * 使用postcss 来写构建流程
 *
 * */



var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnext = require("cssnext");
var precss = require("precss");

gulp.task("postcss", function(){
	var processors = [
		autoprefixer()
	];
	
	return gulp.src(["./css/**/*.css"])
	.pipe(postcss(processors))
	.pipe(gulp.dest("./css/postcss/"));
	
});