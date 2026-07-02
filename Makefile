run:
	npm run start

build:
	npm run make

publish:
	npm run publish

version:
	npm version $(v)

push-release:
	git push origin master --follow-tags

ready:
	git add . && git commit 