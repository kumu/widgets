var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Slideshare", function() {
  describe("Slideshare", function() {
    it("embeds the presentation", function() {
      expect(render("slideshare/id")).to.eql(read("test/widgets/slideshare/slideshare.html"));
    });
  });
});
