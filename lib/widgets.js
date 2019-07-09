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

var utils = require("./utils");
var helper = require("./registry").helper;

require("./widgets/insightmaker/insightmaker")(helper, utils);
require("./widgets/slideshare/slideshare")(helper, utils);
require("./widgets/speakerdeck/speakerdeck")(helper, utils);
require("./widgets/vimeo/vimeo")(helper, utils);
require("./widgets/youtube/youtube")(helper, utils);
require("./widgets/soundcloud/soundcloud")(helper, utils);
require("./widgets/scribd/scribd")(helper, utils);
