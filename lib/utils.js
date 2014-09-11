var read = require("fs").readFileSync;
var _ = require("underscore");
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
  var template = _.template(utils.read("lib/widgets/" + path + ".jst"));
  return data ? template(data) : template;
};

// Compile template from string.
// TODO: deprecate utils.template since read's not available to browserify
utils.t = function(string) {
  return _.template(string);
}

utils.encode = function(url) {
  return encodeURIComponent(url);
}

module.exports = utils;
