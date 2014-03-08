var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Vimeo", function() {
  describe("Vimeo", function() {
    it("embeds the video", function() {
      expect(render("vimeo/123")).to.eql(read("test/widgets/vimeo/vimeo.html"));
    });

    describe("aspect", function() {
      it("default [hd]", function() {
        expect(render("vimeo/123")).to.contain('data-aspect-ratio="hd"');
      });

      it("custom", function() {
        expect(render("vimeo/123?aspect=sd")).to.contain('data-aspect-ratio="sd"');
      });
    });
  });
});
