var gulp = require("gulp");                         /*gulp*/
var sass = require("gulp-sass");                    /*sass 编译*/
var uglifycss = require("gulp-uglifycss");          /*压缩css*/
var rev = require("gulp-rev");                      /*生成文件hash及对应的rev-manifest.json文件，里面存储这个文件及hash文件的对应关系*/
var revCollector = require("gulp-rev-collector");   /*替换页面中的hash文件*/
var clean = require("gulp-clean");                  /*清空某个文件或者文件夹*/
var gulpSequence = require("gulp-sequence");        /*保证依赖任务顺序执行*/
var git = require("gulp-git");                      /*git 提交文件*/
var connect = require("gulp-connect");              /*web静态服务器*/
var importOnce = require('node-sass-import-once');     /*sass编译,解决sass import 重复引入的问题*/
var base64 = require("gulp-base64");

var uglifyjs = require('gulp-uglify');              /** 压缩js */

var rename = require('gulp-rename');                /**  重命名 文件*/

var pump = require('pump');

var concat = require('gulp-concat');                /** 合并文件*/




//编译sass
gulp.task("sass",function(){
    console.log("task sass start...");
    return gulp.src("./sass/**/*.scss").pipe(sass(
        {
	        importer: importOnce,
            importOnce: {
                    index: false,
                    css: false,
                    bower: false
                }
        }
    ).on('error',sass.logError)).pipe(gulp.dest("./css"));
});


//给图片生成hash
gulp.task("imagehash",function(){
	console.log("imagehash");
	return gulp.src("./images/**.png").pipe(rev()).pipe(gulp.dest("./images/rev/")).pipe(rev.manifest()).pipe(gulp.dest("./rev/image"));
});


//压缩及生成hash版本
gulp.task("uglifycss" ,["sass","imagehash"],function(){
    console.log("task uglifycss start...");
    return gulp.src("./css/**/*.css")
    .pipe(uglifycss({uglyComments:true}))               /*压缩*/
    .pipe(rev()).pipe(gulp.dest("./css/rev/"))          /*生成hash*/
    .pipe(rev.manifest())                               /*生成hash 的 manifest*/
    .pipe(gulp.dest("./rev/css"))                       /*存放到./ref/css下面*/
    
});

// 小于20k 的图片被替换成base64
gulp.task("image-base64",function(){
	return gulp.src("./css/rev/**/*.css")
	.pipe(base64({
		extensions: ['png'],
		maxImageSize: 20 * 1024
	}))
	.pipe(gulp.dest("./css/rev"));
});


//发布css,替换css 中的图片hash
gulp.task("releasecss", ["uglifycss"],function(){
	return gulp.src(['./rev/image/*.json',"./css/rev/**/*.css"])
	.pipe(revCollector(
		{
			dirReplacements:{
				"css": "css/rev",
				"images": "../images/rev"
			}
		}
	))                                                  /*替换css中的图片hash*/
	.pipe(gulp.dest("./css/rev/"));
});



//发布、及发布最后生成的html到html/rev 文件夹下
gulp.task("releasehtml",function(){
	console.log("task rev start ...");
	return gulp.src(['./rev/css/*.json',"./html/src/**/*.html"]).pipe(revCollector(
		{
			dirReplacements:{
				"css": "css/rev",
				"images": "../images/rev"
			}
		}
	)).pipe(gulp.dest("./html/rev/"));
});



//清空css hash文件
gulp.task("clean-css", function(){
    console.log("task clean-css start...");
   return  gulp.src("./css/",{read: false}).pipe(clean());
});


//清空 image  hash文件
gulp.task("clean-image", function(){
    return gulp.src("./images/rev/",{read: false}).pipe(clean());
});

// 清空  manifest 文件
gulp.task("clean-rev-mainifest", function(){
    return gulp.src("./rev/",{read: false}).pipe(clean());
});

//清空html 发布文件
gulp.task("clean-html",function(){
	console.log("task clean-html start ...");
	return gulp.src("./html/rev/",{read: false}).pipe(clean());
});

//清空所有 非源文件
gulp.task("clean", gulpSequence("clean-css",'clean-image','clean-html','clean-rev-mainifest'));



//发布生成的html
gulp.task("build",gulpSequence("clean","releasecss","releasehtml"));




//gulp js


gulp.task('likezepto',function(){
	var module = ['module2','likeZepto'];
	var baseUrl = './js/';
	var destUrl = './js/dest/'
	function moduleUrl(){
		return module.map(function(item, index){
			return baseUrl + item + '.js';
		});
	}
	return gulp.src(moduleUrl())
	.pipe(concat('likeZepto.js'))
	// .pipe(rename({suffix: '.min'}))
	// .pipe(uglifyjs())
	.pipe(gulp.dest(destUrl));
});

gulp.task('minify', function(cb){
	var options = {};
	pump([
			gulp.src('js/dest/*.js'),
			uglifyjs(),
			gulp.dest('js/dest')
		],
		cb
	);
	
});



//开发过程中要监听文件，之后编译
gulp.task("watch",function(){
    console.log("task watch start...");
    var watcher = gulp.watch(['./sass/**/*.scss','./html/**/*.html', './images/**/*.png','./js/*.js'],['sass','likezepto','reload']);
    watcher.on("change", function(event){
        console.log("File: " + event.path + " was " + event.type + ",   run tasks...");
    });
    return watcher;
});


//默认任务
gulp.task("default",['sass','server','watch'], function(){
    console.log("gulp end...");
});




//git 提交相关
gulp.task("git-pull", function(){
    git.pull("origin","master", function(err){
        if(err){
            console.log("git-pull err:" + err);
        }
    })
});



gulp.task("git-add", function(){
    return gulp.src(["./*", "!node_modules","!css","!html/rev","!images/rev","!rev"]).pipe(git.add());
});

gulp.task("git-commit", function(){
    gulp.src(["./*", "!node_modules","!css","!html/rev","!images/rev","!rev"])
    .pipe(git.commit("gulp-commit" + new Date(),{args: '-m gulp-task'}));

});

gulp.task("git-push", function(){
    git.push("origin","master", function(err){
        if(err){
            console.log("git-push err" + err);
        }
    })
});


gulp.task("git",gulpSequence("git-add","git-commit","git-push"));



/*gulp 静态服务器*/
gulp.task("server", function(){
    connect.server({
        root:"./",
        livereload: true
    })
});



/*gulp reload*/
gulp.task("reload", function(){
   gulp.src("./html/**/*.html").pipe(connect.reload());
});





