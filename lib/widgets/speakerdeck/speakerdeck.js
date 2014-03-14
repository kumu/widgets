//
// The Speaker Deck widget allows you to easily embed presentations.
//
// ```
// [[speakerdeck/:id]]
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
// [[speakerdeck/1234?aspect=hd]]
// ```
//
function render(id, options) {
  return this.template("fixed-iframe", {
    src: "https://speakerdeck.com/player/" + id,
    aspect: options.aspect
  });
}

module.exports = function(widgets) {
  widgets.add("speakerdeck/:id", render, {aspect: "sd"});
};
