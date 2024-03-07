build_style:
	@echo "Building the css files"
	npx tailwindcss -i ./styles/main.css -o ./dist/tailwind.css
