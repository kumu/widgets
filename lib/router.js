var _ = require("underscore");
var Paperboy = require("./paperboy");
var router = new Paperboy();

function add(route, render, defaults) {
  return router.add(route, render, defaults);
}

function call(path, options, context) {
  return router.call(path, options, context);
}

module.exports = {add: add, call: call};
