//npm install --save-dev gulp@3.9.1 gulp-compass  gulp-uglifycss gulp-minify gulp-minify-inline gulp-babel babel-core babel-preset-env babel-polyfill babel-preset-es2015 babel-preset-stage-2 autoprefixer gulp-postcss gulp-sourcemaps gulp-htmlmin gulp-babel @babel/core @babel/preset-env

var gulp = require("gulp");
//npm install gulp@3.9.1 --save-dev

//npm install --save-dev gulp-compass
const compass = require("gulp-compass"),
  //npm install --save-dev gulp-uglifycss
  uglifycss = require("gulp-uglifycss"),
  //npm install --save-dev gulp-minify
  minify = require("gulp-minify"),
  //npm i autoprefixer --save-dev
  autoprefixer = require("autoprefixer"),
  //npm install --save-dev gulp-postcss
  postcss = require("gulp-postcss"),
  //npm i gulp-sourcemaps --save-dev
  sourcemaps = require("gulp-sourcemaps");

//Converts sass to css, autoprefix, save to dev/css and minify and save to /css
// uses compass, uglifycss, autoprefixer, postcss and sourcemaps
gulp.task("sass", function() {
  gulp
    .src(`sass/style.scss`)
    .pipe(
      compass({
        css: `css`,
        sass: `sass`,
        project: __dirname + "/"
      })
    )
    .on("error", function(error) {
      // Would like to catch the error here
      console.log(error);
      this.emit("end");
    })
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`css`))
    .pipe(
      uglifycss({
        uglyComments: true
      })
    )
    .pipe(gulp.dest(`css`));
});

//basic run command of all tasks
gulp.task("run", ["sass"]);

//gulp watch task watching specific folders/files
gulp.task("watch", function() {
  gulp.watch(`sass/*.scss`, ["sass"]);
});

gulp.task("default", ["run", "watch"]);
