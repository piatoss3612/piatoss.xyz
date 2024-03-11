.PHONY: dev
dev:
	@echo "Starting development server..."
	@cd piatoss && yarn dev

.PHONY: build
build:
	@echo "Building..."
	@cd piatoss && yarn build

.PHONY: sync
sync:
	@echo "Syncing with s3..."
	@cd piatoss && aws s3 sync out/ s3://piatoss.xyz && aws cloudfront create-invalidation --distribution-id $(did) --paths "/*"