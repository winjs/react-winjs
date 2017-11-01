// var gulp = require("gulp");
import gulp from "gulp";
// var gutil = require("gulp-util");
import gutil from "gulp-util";
// var webpack = require("webpack");
import webpack from "webpack";

gulp.task("build", ["build:webpack", "build:winjs"]);

/*
 Copy over core winjs files to the dist folder
 */
gulp.task("build:winjs", function() {
  return gulp.src([
    'node_modules/winjs/js/base.min.js',
    'node_modules/winjs/js/ui.min.js',
    'node_modules/winjs/css/ui-light.min.css',
    'node_modules/winjs/fonts/*'
  ], { base: 'node_modules/winjs' }).pipe(gulp.dest('dist'))
});

/*
 Build library
 */
gulp.task("build:webpack", function(callback) {
  webpack(require('./webpack.config'), function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
    callback();
  });
});
