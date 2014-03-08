// Simple uri-based callback router based on Backbone.Router / History
var _ = require("underscore");
var qs = require("qs");

var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Paperboy router
function Paperboy() {
  this.routes = [];
}

Paperboy.prototype.add = function(route, callback, defaults) {
  this.routes.push(new Route(route, callback, defaults));
  return this;
};

// Invokes the route within the optional context. Route will be executed
// within the router's context if not given.
Paperboy.prototype.call = function(path, options, context) {
  for (var route, i = 0; i < this.routes.length; i++) {
    if ((route = this.routes[i]).test(path)) {
      return route.call(path, options, context || this);
    }
  }
};


// Route model
function Route(route, callback, defaults) {
  this.route = typeof route == "string" ? regexify(route) : route;
  this.callback = callback;
  this.defaults = defaults;
}

Route.prototype.test = function(route) {
  return this.route.test(route);
};

Route.prototype.call = function(path, options, context) {
  var args = this.route.exec(path).slice(1);
  args = _.map(args, decode);
  args.push(_.defaults({}, options, qs.parse(args.pop()), this.defaults));
  return this.callback.apply(context, args);
};


// Utility functions
function decode(value) {
  return value ? decodeURIComponent(value) : undefined;
}

function regexify(route) {
  route = route
    .replace(escapeRegExp, "\\$&")
    .replace(optionalParam, "(?:$1)?")
    .replace(namedParam, function(match, optional) {
      return optional ? match : "([^/?]+)";
    })
    .replace(splatParam, "([^?]*?)")
    .concat("(?:\\?(.*))?");

  return new RegExp("^" + route + "$");
}


module.exports = Paperboy;
