# Juampi's blog source code

## Run

```bash
npm run watch
```

## Build

```bash
npm run prod
git add build_production && git commit -m "Build for deploy"
git subtree push --prefix build_production origin gh-pages
```

## [Markdown tips](https://michelf.ca/projects/php-markdown/extra/)

- `### Header {#id-for-anchor}`
- `[link](https://...){target=_blank}`
