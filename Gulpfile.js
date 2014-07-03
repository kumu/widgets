var _ = require("underscore");
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var declare = require("gulp-declare");
var insert = require("gulp-insert");
var through = require("through2");

var widgetRoot = process.cwd() + "/lib/widgets/";

gulp.task("lint", function() {
  gulp.src(["./lib/**/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

// There is some serious voodoo going on with this one.
//
// The output needs to be wrapped in a self-executing function or we run
// into "unexpected token" errors during `rake assets:precompile`
//
// We also need to include a statement outside of the function or we run
// into "Uncaught object" errors during development.
gulp.task("templates", function(){
  function logicalPath(path) {
    return path.replace(widgetRoot, "").replace(".jst", "");
  }

  gulp.src("lib/**/*.jst")
    .pipe(through.obj(function (file, enc, cb) {
      try {
        file.contents = new Buffer(_.template(file.contents.toString()).source);
      } catch (err) {
        this.emit('error', new gutil.PluginError('gulp-template', err));
      }

      this.push(file);
      cb();
    }))
    .pipe(declare({
      namespace: "Widgets.templates",
      processName: logicalPath
    }))
    .pipe(concat("templates.js"))
    .pipe(insert.wrap("(function() {\n", "\n}).call(this);\n"))
    .pipe(gulp.dest("./tmp"));
});

gulp.task("concat", function() {
  gulp.src(["tmp/index.js", "tmp/templates.js"])
    .pipe(concat("widgets.js"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", function() {
  gulp.run("jshint", "test");
});

// Getting useless stack traces when mocha is run through gulp
// gulp.task("test", function() {
//   gulp.src("test/**/*.js")
//     .pipe(mocha({ reporter: "spec" }));
// });

// Exec output not being captured for some reason
// gulp.task("browserify", function() {
//   // gulp.src("").pipe(exec("browserify index.js -s Widgets > ./tmp/index.js"));
//   // gulp.src("")
//     // .pipe(exec("browserify index.js"))
//     // .pipe(gulp.dest("./tmp"));
// });

// gulp.task("browserify", function() {
//   gulp.src("index.js")
//     .pipe(browserify({
//       external: ["underscore", "qs"],
//       standalone: "Widgets",
//       // exclude: "underscore", // ["underscore", "qs"]
//       ignoreMissing: true
//     }))
//     .pipe(gulp.dest("./tmp"));
// });
