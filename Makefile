.PHONY: test
test: dist
	@cd test && bash test.sh
	@echo ""

dist: compile
	@cat dist/latin1-barcode.js | npx minify --js > dist/latin1-barcode.min.js
	@echo "Created files:"
	@echo "dist/latin1-barcode.js"
	@echo "dist/latin1-barcode.min.js"
	@echo "dist/latin1-barcode.js.map"
	@echo ""

compile: deps
	@npx tsc
	@echo ""

deps:
	@npm install
	@echo ""