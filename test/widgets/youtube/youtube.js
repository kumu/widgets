var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Youtube", function() {
  describe("Youtube", function() {
    it("embeds the video", function() {
      expect(render("youtube/123")).to.eql(read("test/widgets/youtube/youtube.html"));
    });

    describe("aspect", function() {
      it("default [sd]", function() {
        expect(render("youtube/123")).to.contain('data-aspect-ratio="sd"');
      });

      it("custom", function() {
        expect(render("youtube/123?aspect=hd")).to.contain('data-aspect-ratio="hd"');
      });
    });
  });
});
