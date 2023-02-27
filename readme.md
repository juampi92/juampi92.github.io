# Juampi's blog source code

## Run

```bash
npm run watch
```

## Setup

```
git clone -b gh-pages git@github.com:juampi92/juampi92.github.io.git gh-pages
```

## Build


```bash
npm run prod
rm -fr gh-pages/*
cp -a ./build_production/. ./gh-pages/
cd ./gh-pages
git add . && git commit -m "Build for deploy"
git push && cd ..
```

one-liner:
```
npm run prod && rm -fr gh-pages/* && cp -a ./build_production/. ./gh-pages/ && cd ./gh-pages && git add . && git commit -m "Build for deploy" && git push && cd ..
```

## [Markdown tips](https://michelf.ca/projects/php-markdown/extra/)

- `### Header {#id-for-anchor}`
- `[link](https://...){target=_blank}`
