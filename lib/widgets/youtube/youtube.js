//
// The youtube widget allows you to easily embed videos.
//
// ```
// [[youtube/:id]]
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
// Include video with id 1234 at 16x9 with autoplay
// [[youtube/1234?aspect=16x9&autoplay=1]]
// ```
//
function render(id, options) {
  return this.template("fixed-iframe", {
    src: "//www.youtube.com/embed/" + id,
    aspect: options.aspect
  });
}

module.exports = function(widgets) {
  widgets.add("youtube/:id", render, {aspect: "sd"});
};
