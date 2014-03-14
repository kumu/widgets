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
// aspect     desired aspect ratio [hd], sd
// ```
//
// Examples:
//
// ```
// Include video with id 1234 in standard def with autoplay
// [[youtube/1234?aspect=sd&autoplay=1]]
// ```
//
function render(id, options) {
  options.src = "//www.youtube.com/embed/" + id;
  return this.render("iframe", options);
}

module.exports = function(widgets) {
  widgets.add("youtube/:id", render, {aspect: "hd"});
};
