var widgets = require("..");
var utils = require("../lib/utils");
var expect = require("expect.js");

describe("utils", function() {
  describe(".read()", function() {
    it("returns the contents of the file", function() {
      expect(utils.read("lib/widgets/vimeo/vimeo.jst")).to.contain("iframe");
    });
  });

  describe(".template()", function() {
    it("returns template by logical path", function() {
      expect(utils.template("vimeo/vimeo")).to.be.a("function");
    });
  });
});
