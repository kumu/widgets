//
// Renders an iframe. Pass `aspect` option to render iframe with a fixed
// aspect ratio.
//
// src      - url
//
// Fixed Size:
// width    - iframe width: [100%]
// height   - iframe height: 300
//
// Fixed Aspect:
// aspect   - desired aspect ratio: sd, hd
//
var utils = require("../../utils");

var fixedSize = utils.t('\
<iframe src="<%- src %>" frameborder="0" width="<%- width %>" height="<%- height %>"\n\
  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\
');

var fixedAspect = utils.t('\
<div class="widget-container" data-aspect-ratio="<%- aspect %>">\n\
  <div class="widget-content">\n\
    <iframe src="<%- src %>" frameborder="0" width="100%" height="100%"\n\
      webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n\
  </div>\n\
</div>\
');

function render(options) {
  var template = options.aspect ? fixedAspect : fixedSize;
  return template(options);
}

module.exports = render;
