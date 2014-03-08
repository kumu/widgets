build: index templates
	gulp compile

index:
	browserify index.js -x glob -s Widgets > tmp/index.js

templates:
	gulp templates

lint:
	gulp lint

test:
	mocha test/*.js test/widgets --recursive -R spec

install:
	npm install

.PHONY: test
