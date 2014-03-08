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

// Returns an underscore template from the given logical path
utils.template = function(path) {
  if (typeof window == "undefined")
    return _.template(utils.read("lib/widgets/" + path + ".jst"));
  else
    return Widgets.templates[path];
};

module.exports = utils;
