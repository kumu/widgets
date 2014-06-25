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

require("./widgets/iframe/iframe")(helper);
require("./widgets/insightmaker/insightmaker")(helper);
require("./widgets/slideshare/slideshare")(helper);
require("./widgets/speakerdeck/speakerdeck")(helper);
require("./widgets/vimeo/vimeo")(helper);
require("./widgets/youtube/youtube")(helper);
