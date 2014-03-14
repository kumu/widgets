var widgets = require("..");
var utils = require("../lib/utils");
var expect = require("expect.js");

describe("utils", function() {
  describe(".read()", function() {
    it("returns the contents of the file", function() {
      expect(utils.read("lib/widgets/test/test.jst")).to.contain("Awww yeah!");
    });
  });

  describe(".template()", function() {
    it("returns template by logical path", function() {
      expect(utils.template("test/test")).to.be.a("function");
    });
  });
});
