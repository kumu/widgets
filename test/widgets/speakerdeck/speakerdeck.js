var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Speaker Deck", function() {
  describe("speakerdeck/:id", function() {
    it("embeds the presentation", function() {
      expect(render("speakerdeck/id")).to.eql(read("test/widgets/speakerdeck/speakerdeck.html"));
    });
  });
});
