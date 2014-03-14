var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Speaker Deck", function() {
  describe("speakerdeck/:id", function() {
    it("embeds the presentation", function() {
      expect(render("speakerdeck/123")).to.eql(read("test/widgets/speakerdeck/speakerdeck.html"));
    });

    describe("aspect", function() {
      it("default [sd]", function() {
        expect(render("speakerdeck/123")).to.contain('data-aspect-ratio="sd"');
      });

      it("custom", function() {
        expect(render("speakerdeck/123?aspect=other")).to.contain('data-aspect-ratio="other"');
      });
    });
  });
});
