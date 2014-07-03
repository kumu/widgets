build:
	browserify index.js -x glob -s Widgets > tmp/index.js
	gulp templates
	gulp concat

lint:
	gulp lint

test:
	mocha test/*.js test/widgets --recursive -R spec

install:
	npm install

.PHONY: test
