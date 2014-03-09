var expect = require("expect.js");
var render = require("../../support").widgets.render;
var read = require("../../support").utils.read;

describe("Insight Maker", function() {
  describe("insightmaker/:id", function() {
    it("embeds the model", function() {
      var actual = render("insightmaker/8892", {title: "Creating the Future"});
      var expected = read("test/widgets/insightmaker/insightmaker.html");
      expect(actual).to.eql(expected);
    });

    describe("without title", function() {
      it("uses url for link text", function() {
        expect(render("insightmaker/8892")).to.contain("8892</a>");
      });
    });
  });
});
