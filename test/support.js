var Context = require("../lib/context");

// Render widget directly by name with the given arguments.
function render(name, args) {
  var context = new Context();
  return context.render.apply(context, arguments);
}

var exports = module.exports = {};
exports.widgets = require("..");
exports.utils = require("../lib/utils");
exports.render = render;
