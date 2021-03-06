//
// The slideshare widget allows you to easily embed slideshare presentations.
//
// ```
// [[slideshare/:id]]
// ```
//
// Options:
//
// ```
// aspect     desired aspect ratio [sd], hd
// ```
//
// Examples:
//
// ```
// Include presentation with id 1234 in high def
// [[slideshare/1234?aspect=hd]]
// ```
//
var iframe = require("../iframe/iframe");

function render(id, options) {
  options.src = "//www.slideshare.net/slideshow/embed_code/" + id;
  return iframe(options);
}

module.exports = function(widgets) {
  widgets.add("slideshare/:id", render, {aspect: "sd"});
};
