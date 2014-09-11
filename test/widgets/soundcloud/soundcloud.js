var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("SoundCloud", function() {
  describe("soundcloud/id", function() {
    it("embeds the track", function() {
      expect(render("soundcloud/id")).to.eql(read("test/widgets/soundcloud/soundcloud.html"));
    });
  });
});
