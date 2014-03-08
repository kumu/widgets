//
// // Anonymous widgets
// module.exports = function(widgets) {
//   widgets.add("vimeo/:id", render, {aspect: "hd"});
// };
//
// // Named widgets
// module.exports = function(widgets) {
//   widgets.register("vimeo", render, defaults)
//     .route("vimeo/:id", {aspect: "hd"})
//     .route("vimeo/:id/sd", {aspect: "sd"})
//     .route("vimeo/:id/hd", {aspect: "hd"});
// };

var helper = require("./registry").helper;

if (typeof window == "undefined") {
  // development build
  var glob = require("glob");
  glob("lib/widgets/**/*.js", {sync: true}, function (err, files) {
    files.forEach(function(file) {
      var widget = require(file.replace("lib", "."));
      widget(helper);
    });
  });
} else {
  // browser build
  // TODO: automate this
  require("./widgets/vimeo/vimeo")(helper);
}

