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
	export GITHUB_TOKEN="$(GITHUB_TOKEN)" || { echo "Set GITHUB_TOKEN or GH_TOKEN before publishing."; exit 1; }
	git add . && git commit -m "Release v$(v)" && npm version $(v) && npm run publish && git push origin master --follow-tags

save:
	git add . && git commit 