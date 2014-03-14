var _ = require("underscore");
var utils = require("./utils");
var registry = require("./registry");

function Context(context) {
  _.extend(this, context);
}

Context.prototype.template = function(name, data) {
  return utils.template(name, data);
};

Context.prototype.render = function(name, args) {
  var widget = registry.get(name);
  var options = _.last(arguments);
  _.defaults(options, widget.defaults);
  return widget.render.apply(this, _.rest(arguments));
};

Context.prototype.extend = _.extend;
Context.prototype.defaults = _.defaults;

// Context.prototype.redirect = function(route, options, context) {...}

module.exports = Context;
