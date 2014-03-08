var expect = require("expect.js");
var widgets = require("..");

describe("widgets", function() {
  describe(".get()", function() {
    it("returns the widget", function() {
      expect(widgets.get("vimeo")).to.be.defined;
    });
  });

  describe(".render()", function() {
    it("renders the widget", function() {
      expect(widgets.render("vimeo/123")).to.contain("iframe");
    });

    it("accepts option overrides", function() {
      var html = widgets.render("vimeo/123?aspect=hd", {aspect: "sd"});
      expect(html).to.contain('data-aspect-ratio="sd"');
    });

    // TODO: We should probably escape the route in this case
    it("renders the route when unrecognized", function() {
      expect(widgets.render("missing")).to.eql("missing");
    });
  });
});
