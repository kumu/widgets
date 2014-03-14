var expect = require("expect.js");
var support = require("../../support");
var read = support.utils.read;
var render = support.render;

describe("iframe", function() {
  it("can render fixed aspect", function() {
    var options = {src: "url", aspect: "aspect"};
    expect(render("iframe", options)).to.eql(read("test/widgets/iframe/fixed_aspect.html"));
  });

  it("can render fixed size", function() {
    var options = {src: "url", width: "width", height: "height"};
    expect(render("iframe", options)).to.eql(read("test/widgets/iframe/fixed_size.html"));
  });
});
