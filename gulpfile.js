"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sass   = require("gulp-sass"),
    maps   = require("gulp-sourcemaps"),
    del    = require("del");

gulp.task('jquery', function () {
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./js/'));
});

gulp.task("concatScripts", function(){
  return gulp.src([
      "js/main.js",
      "node_modules/jquery/dist/jquery.min.js"
    ])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function(){
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("js"))
});

gulp.task("compileSass", function(){
  gulp.src("scss/app.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write("./"))
    .pipe(gulp.dest("css"));
});

gulp.task("fonts", function(){
  return gulp.src('./vendor/font-awesome-4.7.0/css/font-awesome.min.css')
      .pipe(gulp.dest("./css/")),
      gulp.src("./vendor/font-awesome-4.7.0/fonts/fontawesome*")
      .pipe(gulp.dest("./fonts/"));
});

gulp.task("watchFiles", function(){
  gulp.watch("scss/**/*.scss", ["compileSass"]);
  gulp.watch("js/main.js", ["concatScripts"]);
});

gulp.task("clean", function(){
  del(["dist", "css/app.css*", "css/font-awesome*", "js/app*.js*","js/jquery.*", "fonts/fontawesome*"]);
});

gulp.task("build",["minifyScripts", "compileSass","fonts"], function(){
  return gulp.src(["css/app.css","css/font-awesome*", "js/app.min.js", "index.html", "images/**", "fonts/**"],
  {base: "./"})
    .pipe(gulp.dest("dist"));
});

gulp.task("serve", ["watchFiles"]);

gulp.task("default", ["clean"], function(){
  gulp.start("build");
});
