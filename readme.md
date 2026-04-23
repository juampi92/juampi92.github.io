# Juampi's Blog

Hi 👋
If you're looking for my blog, it's here: https://barreto.jp/

----

## Behind the scenes

This blog is made using SvelteKit, built statically and deployed into gh-pages using an [action](./.github/workflows/deploy.yml).

It is pretty straight-forward. Local development using with `npm run dev`.

The `/posts` directory contains each article in a separate folder (which name will be the article's slug), with a corresponding `index.md` file. Any other asset must be placed in the article's individual folder, and referenced relatively from the markdown file.