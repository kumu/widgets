//
// Generates Insight Maker links that'll open within the lightbox.
//
// ```
// [[insightmaker/:id]]
// [[insightmaker/:id "link text"]]
// ```
//
// If the link text is not given the url will be used instead.
//
//
// Examples:
//
// ```
// Include "Creating the Future" link to Insight Maker #8892
// [[insightmaker/8892 "Creating the Future"]]
// ```
//
function render(id, options) {
  var url = "http://insightmaker.com/insight/" + id;
  return this.template("insightmaker/insightmaker", {
    href: url,
    text: options.title || url
  });
}

module.exports = function(widgets) {
  widgets.add("insightmaker/:id", render);
};
