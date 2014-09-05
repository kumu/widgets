//
// The vimeo widget allows you to easily embed videos.
//
// ```
// [[vimeo/:id]]
// ```
//
// Options:
//
// ```
// aspect     desired aspect ratio [hd], sd
// ```
//
// Examples:
//
// ```
// Include video with id 1234 at 16x9 with autoplay
// [[vimeo/1234?aspect=16x9&autoplay=1]]
// ```
//
function render(id, options) {
  options.src = "//player.vimeo.com/video/" + id;
  options.src += "?title=0&byline=0&portrait=0";
  if (options.autoplay) options.src += "&autoplay=1";

  return this.render("iframe", options);
}

module.exports = function(widgets) {
  widgets.add("vimeo/:id", render, {aspect: "hd"});
};
