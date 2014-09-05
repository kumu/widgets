var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Youtube", function() {
  describe("Youtube", function() {
    it("embeds the video", function() {
      expect(render("youtube/id")).to.eql(read("test/widgets/youtube/youtube.html"));
    });

    it("forwards params", function() {
      expect(render("youtube/id?autoplay=1")).to.contain("autoplay=1");
    });
  });
});
