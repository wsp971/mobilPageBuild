var gulp = require("gulp");
var sass = require("gulp-sass");                    /*sass 编译*/
var uglifycss = require("gulp-uglifycss");          /*压缩css*/
var rev = require("gulp-rev");                      /*生成文件hash及对应的rev-manifest.json文件，里面存储这个文件及hash文件的对应关系*/
var revCollector = require("gulp-rev-collector");   /*替换页面中的hash文件*/
var clean = require("gulp-clean");                  /*清空某个文件或者文件夹*/
var gulpSequence = require("gulp-sequence");        /*保证依赖任务顺序执行*/
var git = require("gulp-git");                  /*git 提交文件*/


//编译sass
gulp.task("sass",function(){
    console.log("task sass start...");
    return gulp.src("./sass/*.scss").pipe(sass().on('error',sass.logError)).pipe(gulp.dest("./css"));
});

//压缩及生成hash版本
gulp.task("uglifycss" ,["sass"],function(){
    console.log("task uglifycss start...");
    return  gulp.src("./css/*.css").pipe(uglifycss({uglyComments:true})).pipe(rev()).pipe(gulp.dest("./css/rev/")).pipe(rev.manifest()).pipe(gulp.dest("./rev"));
});

//清空css hash文件
gulp.task("clean-css", function(){
    console.log("task clean-css start...");
   return  gulp.src("./css/rev/",{read: false}).pipe(clean());
});

//清空发布文件
gulp.task("clean-html",function(){
   console.log("task clean-html start ...");
   return gulp.src("./html/rev/",{read: false}).pipe(clean());
});

//发布、及发布最后生成的html到html/rev 文件夹下
gulp.task("release",function(){
   console.log("task rev start ...");
   return gulp.src(['./rev/*.json',"./html/src/*.html"]).pipe(revCollector(
       {
           dirReplacements:{
               "css": "css/rev"
           }
       }
   )).pipe(gulp.dest("./html/rev/"));
});



//开发过程中要监听文件，之后编译
gulp.task("watch",function(){
    console.log("task watch start...");
    var watcher = gulp.watch('./sass/**/*.scss',['sass']);
    watcher.on("change", function(event){
        console.log("File: " + event.path + " was " + event.type + ",   run tasks...");
    });
    return watcher;
});


//默认开发任务
gulp.task("default",['sass','watch'], function(){
    console.log("gulp end...");
});

//发布生成的html
gulp.task("build",gulpSequence("clean-css",["uglifycss","clean-html"],"release"));



//git 提交相关
gulp.task("git-pull", function(){
    git.pull("origin","master", function(err){
        if(err){
            console.log("git-pull err:" + err);
        }
    })
});

gulp.task('init', function () {
    git.init(function (err) {
        if (err) throw err;
    });
});

gulp.task("add", function(){
    return gulp.src("./css/*").pipe(git.add());
});

gulp.task("git-commit", function(){
    gulp.src("./*").pipe(git.commit("gulp-commit" + new Date(),{args: '-m user: wangshiping'}));

});

gulp.task("git-push", function(){
    git.push("origin","master", function(err){
        if(err){
            console.log("git-push err" + err);
        }
    })
});

gulp.task("git",gulpSequence('init',"add","git-commit","git-push"));
