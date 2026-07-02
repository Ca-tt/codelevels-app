run:
	npm run start

build:
	npm run make

publish:
	npm run publish

version:
	npm version $(v)

tag:
	npm version $(v) && git tag -a v$(v) -m "Release v$(v)"

release:
	git add . && git commit  && npm version $(v) && git push origin master --follow-tags

save:
	git add . && git commit 