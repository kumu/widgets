var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Vimeo", function() {
  describe("Vimeo", function() {
    it("embeds the video", function() {
      expect(render("vimeo/id")).to.eql(read("test/widgets/vimeo/vimeo.html"));
    });
  });
});
