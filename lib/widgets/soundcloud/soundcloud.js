//
// The soundcloud widget allows you to easily embed music and other audio tracks.
//
// ```
// [[soundcloud/:id]]
// ```
//
// Options:
//
// ```
// autoplay
// related
// comments
// user
// reports
// visual
// ```
//
// Examples:
//
// ```
// Include track with id 1234 with autoplay
// [[soundcloud/1234?autoplay=1]]
// ```
//
var querystring = require("querystring");
var iframe = require("../iframe/iframe");

module.exports = function(widgets, utils) {
  function render(id, options) {
    var url = "https://api.soundcloud.com/tracks/" + id + "?" + params(options);
    var src = "https://w.soundcloud.com/player/?url=" + utils.encode(url);

    return options.visual ? visual(src, options) : classic(src, options);
  }

  function classic(src, options) {
    var opts = {
      src: src,
      width: "100%",
      height: 166
    };

    return iframe(opts);
  }

  function visual(src, options) {
    var opts = {
      src: src,
      aspect: "sq"
    };

    return iframe(opts);
  }

  // Translated options:
  // visual
  // auto_play
  // hide_related
  // show_comments
  // show_user
  // show_reposts
  function params(options) {
    var opts = {
      visual:         bool(options.visual),
      auto_play:      bool(options.autoplay),
      hide_related:  !bool(options.related),
      show_comments:  bool(options.comments),
      show_user:      bool(options.user),
      show_reposts:   bool(options.reposts)
    };

    return querystring.stringify(opts);
  }

  function bool(value) {
    return !!value;
  }

  // Default to the classic embed
  widgets.add("soundcloud/:id", render, {visual: false});
};
