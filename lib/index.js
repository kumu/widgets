var router = require("./router");
var registry = require("./registry");
var Context = require("./context");

require("./widgets");

function render(route, options, contextExtensions) {
  var context = new Context(contextExtensions);
  return router.call(route, options, context) || route;
}

function get(name) {
  return registry.get(name);
}

module.exports = {render: render, get: get};
