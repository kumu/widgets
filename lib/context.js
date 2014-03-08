var _ = require("underscore");
var utils = require("./utils");

function Context(context) {
  _.extend(this, context);
}

Context.prototype.template = function(name, values) {
  var template = utils.template(name);
  return template(values);
};

module.exports = Context;
