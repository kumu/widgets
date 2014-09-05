!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Widgets=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib/index");

},{"./lib/index":3}],2:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./registry":5,"./utils":7}],3:[function(require,module,exports){
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

},{"./context":2,"./registry":5,"./router":6,"./widgets":8}],4:[function(require,module,exports){
(function (global){
// Simple uri-based callback router based on Backbone.Router / History
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var qs = (typeof window !== "undefined" ? window.qs : typeof global !== "undefined" ? global.qs : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
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

},{"./router":6}],6:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var Paperboy = require("./paperboy");
var router = new Paperboy();

function add(route, render, defaults) {
  return router.add(route, render, defaults);
}

function call(path, options, context) {
  return router.call(path, options, context);
}

module.exports = {add: add, call: call};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./paperboy":4}],7:[function(require,module,exports){
(function (global){
var read = require("fs").readFileSync;
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var utils = {};

utils.trim = function(string) {
  return string.replace(/(^\s+|\s+$)/g, "");
};

// Fetches the file by logical path. Will fetch files within
// lib dir by default but can be used to fetch files within test dir too.
utils.read = function(path) {
  return utils.trim(read(path, "utf8"));
};

// Returns an underscore template from the given logical path.
// Will render the template instead of returning it if data is given.
utils.template = function(path, data) {
  var template;

  if (typeof window == "undefined")
    template = _.template(utils.read("lib/widgets/" + path + ".jst"));
  else
    template = Widgets.templates[path];

  return data ? template(data) : template;
};

module.exports = utils;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":15}],8:[function(require,module,exports){
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

var helper = require("./registry").helper;

require("./widgets/iframe/iframe")(helper);
require("./widgets/insightmaker/insightmaker")(helper);
require("./widgets/slideshare/slideshare")(helper);
require("./widgets/speakerdeck/speakerdeck")(helper);
require("./widgets/vimeo/vimeo")(helper);
require("./widgets/youtube/youtube")(helper);

},{"./registry":5,"./widgets/iframe/iframe":9,"./widgets/insightmaker/insightmaker":10,"./widgets/slideshare/slideshare":11,"./widgets/speakerdeck/speakerdeck":12,"./widgets/vimeo/vimeo":13,"./widgets/youtube/youtube":14}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
//
// The slideshare widget allows you to easily embed slideshare presentations.
//
// ```
// [[slideshare/:id]]
// ```
//
// Options:
//
// ```
// aspect     desired aspect ratio [sd], hd
// ```
//
// Examples:
//
// ```
// Include presentation with id 1234 in high def
// [[slideshare/1234?aspect=hd]]
// ```
//
function render(id, options) {
  options.src = "//www.slideshare.net/slideshow/embed_code/" + id;
  return this.render("iframe", options);
}

module.exports = function(widgets) {
  widgets.add("slideshare/:id", render, {aspect: "sd"});
};

},{}],12:[function(require,module,exports){
//
// The Speaker Deck widget allows you to easily embed presentations.
//
// ```
// [[speakerdeck/:id]]
// ```
//
// Options:
//
// ```
// aspect     desired aspect ratio [sd], hd
// ```
//
// Examples:
//
// ```
// Include presentation with id 1234 in high def
// [[speakerdeck/1234?aspect=hd]]
// ```
//
function render(id, options) {
  options.src = "//speakerdeck.com/player/" + id;
  return this.render("iframe", options);
}

module.exports = function(widgets) {
  widgets.add("speakerdeck/:id", render, {aspect: "sd"});
};

},{}],13:[function(require,module,exports){
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
  options.src = "//player.vimeo.com/video/" + id;
  options.src += "?title=0&byline=0&portrait=0";

  if (options.autoplay) options.src += "&autoplay=1";

  return this.render("iframe", options);
}

module.exports = function(widgets) {
  widgets.add("vimeo/:id", render, {aspect: "hd"});
};

},{}],14:[function(require,module,exports){
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
  options.src = "//www.youtube.com/embed/" + id;

  if (options.autoplay) options.src += "?autoplay=1";

  return this.render("iframe", options);
}

module.exports = function(widgets) {
  widgets.add("youtube/:id", render, {aspect: "hd"});
};

},{}],15:[function(require,module,exports){

},{}]},{},[1])(1)
});
(function() {
this["Widgets"] = this["Widgets"] || {};
this["Widgets"]["templates"] = this["Widgets"]["templates"] || {};
this["Widgets"]["templates"]["iframe/fixed_aspect"] = function(obj){
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
this["Widgets"] = this["Widgets"] || {};
this["Widgets"]["templates"] = this["Widgets"]["templates"] || {};
this["Widgets"]["templates"]["iframe/fixed_size"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<iframe src="'+
((__t=( src ))==null?'':_.escape(__t))+
'" frameborder="0" width="'+
((__t=( width ))==null?'':_.escape(__t))+
'" height="'+
((__t=( height ))==null?'':_.escape(__t))+
'"\n  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n';
}
return __p;
};
this["Widgets"] = this["Widgets"] || {};
this["Widgets"]["templates"] = this["Widgets"]["templates"] || {};
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
this["Widgets"] = this["Widgets"] || {};
this["Widgets"]["templates"] = this["Widgets"]["templates"] || {};
this["Widgets"]["templates"]["test/test"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='Awww yeah!\n';
}
return __p;
};
}).call(this);
