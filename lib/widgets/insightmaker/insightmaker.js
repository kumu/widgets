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

module.exports = function(widgets, utils) {
  var template = utils.t('<a href="<%= href %>" target="lightbox"><%- text %></a>');

  function render(id, options) {
    var url = "http://insightmaker.com/insight/" + id;

    options.href = url;
    options.text = options.title || url;

    return template(options);
  }

  widgets.add("insightmaker/:id", render);
};
