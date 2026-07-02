run:
	npm run start

build:
	npm run make

# example: make release v=1.0.0
release:
	@if [ -f .env ]; then set -a; . ./.env; set +a; fi; \
	if [ -z "$${GITHUB_TOKEN}" ]; then echo "Set GITHUB_TOKEN before publishing."; exit 1; fi; \
	git add . && git commit -m "Release v$(v)" && npm version $(v) && GITHUB_TOKEN="$${GITHUB_TOKEN}" npm run publish && git push origin master --follow-tags

save:
	git add . && git commit 