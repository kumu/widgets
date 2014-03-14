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
function render(options) {
  var template = "iframe/fixed_" + (options.aspect ? "aspect" : "size");
  return this.template(template, options);
}

module.exports = function(widgets) {
  widgets.register("iframe", render);
};
