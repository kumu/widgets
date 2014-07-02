build: widgets templates

widgets:
	browserify index.js -x glob -s Widgets > dist/widgets.js

templates:
	gulp templates

lint:
	gulp lint

test:
	mocha test/*.js test/widgets --recursive -R spec

install:
	npm install

.PHONY: test
