describe("Widgets", function() {
  describe("render", function() {
    it("renders the widget", function() {
      expect(Widgets.render("vimeo/123")).to.contain("iframe");
    });
  });
});
