Widgets
=======

The official Kumu markdown widget collection.

We've extended the [marked][marked] markdown library to support custom widgets
through a simple `[[widget]]` syntax.  Widgets are ridiculously easy to write
and we'd love to accept pull requests for new ones! (See the contributing
guide at the bottom.)

# Basics

Widgets are handled through a simple uri-based router. Required parameters
are handled through named parameters, with optional parameters handled
through the query string.

```
[[vimeo/:86389108?aspect=hd]]
```

# Defining Widgets

All you need is a function to render the widget and a route to attach it to.

Here's the full vimeo widget as an example:

```javascript
// lib/widgets/vimeo/vimeo.js
function render(id, options) {
  return this.template("vimeo/vimeo", {
    src: "//player.vimeo.com/video/" + id + "?title=0&byline=0&portrait=0",
    aspect: options.aspect
  });
}

module.exports = function(widgets) {
  widgets.add("vimeo/:id", render, {aspect: "hd"});
};
```

```html
<!-- lib/widgets/vimeo/vimeo.jst -->
<div class="widget-container" data-aspect-ratio="<%- aspect %>">
  <div class="widget-content">
    <iframe src="<%- src %>" frameborder="0" width="100%" height="100%"
      webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  </div>
</div>
```

(Note: Templates are rendered using [underscore templates][templates].)

# Contributing

We'd love for you to add your own custom widgets. It's easy to get started:

- [Fork the project][fork]
- Install dependencies `make install` (assumes [node][node] already installed)
- Add your widget (see `test/widgets/vimeo` for example)
- Add some tests
- Submit a pull request

# Testing

Run `make test` to run the test suite.


[marked]: https://github.com/kumu/marked
[templates]: http://underscorejs.org/#template
[fork]: https://github.com/kumu/widgets/fork
[node]: http://nodejs.org/
