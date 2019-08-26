var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Scribd", function() {
  describe("Scribd", function() {
    it("embeds the document", function() {
      expect(render("scribd/id")).to.eql(read("test/widgets/scribd/scribd.html"));
    });

    it("forwards params", function() {
      expect(render("scribd/id?show_recommendations=true&start_page=10&style=slideshow")).to.contain("show_recommendations=true&amp;start_page=10&amp;style=slideshow");
    });
  });
});
