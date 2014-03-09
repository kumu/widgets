var widgets = require("..");
var utils = require("../lib/utils");
var expect = require("expect.js");

describe("utils", function() {
  describe(".read()", function() {
    it("returns the contents of the file", function() {
      expect(utils.read("lib/widgets/fixed-iframe.jst")).to.contain("iframe");
    });
  });

  describe(".template()", function() {
    it("returns template by logical path", function() {
      expect(utils.template("fixed-iframe")).to.be.a("function");
    });
  });
});
