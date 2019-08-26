//
// The scribd widget allows you to easily embed documents.
//
// ```
// [[scribd/:id]]
// ```
//
// Options:
//
// ```
// show_recommendations     (Boolean) `true` shows Scribd reading recommendations
// start_page               (Number) Sets the page to start reading from
// style                    (String) 'scroll' shows a scrolling PDF, 'slideshow' creates a slide from each page
// ```
//
// Examples:
//
// ```
// Include document with id 1234, showing Scribd reading recommendations, starting on page 10, with the slideshow style
// [[scribd/1234?show_recommendations=true&start_page=10&style=slideshow]]
// ```
//
var iframe = require("../iframe/iframe");

function render(id, options) {
  options.src = "//www.scribd.com/embeds/" + id + "/content?"
  if (options.show_recommendations) options.src += "show_recommendations=true&"
  if (options.start_page) options.src += `start_page=${options.start_page}&`
  if (options.style) options.src += `style=${options.style}`

  return iframe(options);
}

module.exports = function(widgets) {
  widgets.add("scribd/:id", render, {
    width: "100%",
    height: 400
  });
};
