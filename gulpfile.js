"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var jsmin = require("gulp-jsmin");

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("stylemin", ["copy"], function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/css"))
});

gulp.task("clean", function() {
  return gulp.src("build", {read: false})
    .pipe(clean());
});

gulp.task("copy", ["clean"], function() {
  gulp.src("*.html").pipe(gulp.dest("build"));
  gulp.src("fonts/**/*.{woff,woff2}").pipe(gulp.dest("build/fonts"));
  gulp.src("img/**.{png,jpg,gif,svg}").pipe(gulp.dest("build/img"));
  gulp.src("js/**.js").pipe(gulp.dest("build/js"));
  gulp.src("css/**.css").pipe(gulp.dest("build/css"));
});

gulp.task("minjs", ["copy"], function() {
  return gulp.src("js/*.js")
    .pipe(jsmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
});

gulp.task("build", [
  "clean",
  "copy",
  "stylemin",
  "minjs",
  ], function() {
});
