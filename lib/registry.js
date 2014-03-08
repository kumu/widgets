var registry = {};
var router = require("./router");

// Named widget
function register(name, render, defaults) {
  var widget = (registry[name] = {render: render, defaults: defaults});
  return new NamedWidgetHelper(widget);
}

function get(name) {
  return name ? registry[name] : registry;
}

function NamedWidgetHelper(widget) {
  this.widget = widget;
}

NamedWidgetHelper.prototype.route = function(route, defaults) {
  defaults = _.defaults({}, defaults, this.widget.defaults);
  router.add(route, this.widget.render, defaults);
  return this;
};

NamedWidgetHelper.prototype.defaults = function(defaults) {
  this.widget.defaults = defaults;
  return this;
};

var helper = {
  add: router.add,
  register: register
};

module.exports = {helper: helper, register: register, get: get};
