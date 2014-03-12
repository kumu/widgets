!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Widgets=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = _dereq_("./lib/index");

},{"./lib/index":3}],2:[function(_dereq_,module,exports){
var _ = (window._);
var utils = _dereq_("./utils");

function Context(context) {
  _.extend(this, context);
}

Context.prototype.template = function(name, values) {
  var template = utils.template(name);
  return template(values);
};

module.exports = Context;

},{"./utils":7}],3:[function(_dereq_,module,exports){
var router = _dereq_("./router");
var registry = _dereq_("./registry");
var Context = _dereq_("./context");

_dereq_("./widgets");

function render(route, options, contextExtensions) {
  var context = new Context(contextExtensions);
  return router.call(route, options, context) || route;
}

function get(name) {
  return registry.get(name);
}

module.exports = {render: render, get: get};

},{"./context":2,"./registry":5,"./router":6,"./widgets":8}],4:[function(_dereq_,module,exports){
// Simple uri-based callback router based on Backbone.Router / History
var _ = (window._);
var qs = (window.qs);

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

},{}],5:[function(_dereq_,module,exports){
var registry = {};
var router = _dereq_("./router");

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

},{"./router":6}],6:[function(_dereq_,module,exports){
var _ = (window._);
var Paperboy = _dereq_("./paperboy");
var router = new Paperboy();

function add(route, render, defaults) {
  return router.add(route, render, defaults);
}

function call(path, options, context) {
  return router.call(path, options, context);
}

module.exports = {add: add, call: call};

},{"./paperboy":4}],7:[function(_dereq_,module,exports){
var read = _dereq_("fs").readFileSync;
var _ = (window._);
var utils = {};

utils.trim = function(string) {
  return string.replace(/(^\s+|\s+$)/g, "");
};

// Fetches the file by logical path. Will fetch files within
// lib dir by default but can be used to fetch files within test dir too.
utils.read = function(path) {
  return utils.trim(read(path, "utf8"));
};

// Returns an underscore template from the given logical path
utils.template = function(path) {
  if (typeof window == "undefined")
    return _.template(utils.read("lib/widgets/" + path + ".jst"));
  else
    return Widgets.templates[path];
};

module.exports = utils;

},{"fs":12}],8:[function(_dereq_,module,exports){
//
// // Anonymous widgets
// module.exports = function(widgets) {
//   widgets.add("vimeo/:id", render, {aspect: "hd"});
// };
//
// // Named widgets
// module.exports = function(widgets) {
//   widgets.register("vimeo", render, defaults)
//     .route("vimeo/:id", {aspect: "hd"})
//     .route("vimeo/:id/sd", {aspect: "sd"})
//     .route("vimeo/:id/hd", {aspect: "hd"});
// };

var helper = _dereq_("./registry").helper;

if (typeof window == "undefined") {
  // development build
  var glob = _dereq_("glob");
  glob("lib/widgets/**/*.js", {sync: true}, function (err, files) {
    files.forEach(function(file) {
      var widget = _dereq_(file.replace("lib", "."));
      widget(helper);
    });
  });
} else {
  // browser build
  // TODO: automate this
  _dereq_("./widgets/vimeo/vimeo")(helper);
  _dereq_("./widgets/youtube/youtube")(helper);
  _dereq_("./widgets/insightmaker/insightmaker")(helper);
}


},{"./registry":5,"./widgets/insightmaker/insightmaker":9,"./widgets/vimeo/vimeo":10,"./widgets/youtube/youtube":11,"glob":"R9Jafm"}],9:[function(_dereq_,module,exports){
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

},{}],10:[function(_dereq_,module,exports){
//
// The vimeo widget allows you to easily embed videos.
//
// ```
// [[vimeo/:id]]
// ```
//
// Options:
//
// ```
// aspect     desired aspect ratio [hd], sd
// ```
//
// Examples:
//
// ```
// Include video with id 1234 at 16x9 with autoplay
// [[vimeo/1234?aspect=16x9&autoplay=1]]
// ```
//
function render(id, options) {
  return this.template("fixed-iframe", {
    src: "//player.vimeo.com/video/" + id + "?title=0&byline=0&portrait=0",
    aspect: options.aspect
  });
}

module.exports = function(widgets) {
  widgets.add("vimeo/:id", render, {aspect: "hd"});
};

},{}],11:[function(_dereq_,module,exports){
//
// The youtube widget allows you to easily embed videos.
//
// ```
// [[youtube/:id]]
// ```
//
// Options:
//
// ```
// aspect     desired aspect ratio [hd], sd
// ```
//
// Examples:
//
// ```
// Include video with id 1234 in standard def with autoplay
// [[youtube/1234?aspect=sd&autoplay=1]]
// ```
//
function render(id, options) {
  return this.template("fixed-iframe", {
    src: "//www.youtube.com/embed/" + id,
    aspect: options.aspect
  });
}

module.exports = function(widgets) {
  widgets.add("youtube/:id", render, {aspect: "hd"});
};

},{}],12:[function(_dereq_,module,exports){

},{}]},{},[1])
(1)
});
this["Widgets"] = this["Widgets"] || {};this["Widgets"]["templates"] = this["Widgets"]["templates"] || {};this["Widgets"]["templates"]["fixed-iframe"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="widget-container" data-aspect-ratio="'+
((__t=( aspect ))==null?'':_.escape(__t))+
'">\n  <div class="widget-content">\n    <iframe src="'+
((__t=( src ))==null?'':_.escape(__t))+
'" frameborder="0" width="100%" height="100%"\n      webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n  </div>\n</div>\n';
}
return __p;
};
this["Widgets"]["templates"]["insightmaker/insightmaker"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="'+
((__t=( href ))==null?'':__t)+
'" target="lightbox">'+
((__t=( text ))==null?'':_.escape(__t))+
'</a>\n';
}
return __p;
};