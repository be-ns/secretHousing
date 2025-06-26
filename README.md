# secretHousing

This repository hosts the static website for the "Secret Housing" project. The site is designed to be served via **GitHub Pages** so that a free public version can be published.

Below are the steps to configure GitHub Pages using the contents of this repo. These instructions are based on [GitHub Pages](https://pages.github.com/).

## 1. Decide on your site type
- **User/Organization site**: name the repository `<username>.github.io` and the default branch will render at `https://<username>.github.io/`.
- **Project site**: any other public repository. The Pages URL is `https://<username>.github.io/<repo>/`.

## 2. Structure your repo
- Static files (`index.html`, `style.css`) are located in the `docs/` folder of this repo.
- If you need Jekyll or another static site generator, place its configuration in the repo root.

## 3. Enable GitHub Pages
1. Push the repository to GitHub and open **Settings > Pages**.
2. Choose `main` (or your default) as the source branch and select `/docs` as the folder.
3. Save your changes. Within a minute the published URL will appear on that page.
   - For a custom domain, add a file named `CNAME` in the `docs/` folder with your domain inside.

## 4. (Optional) Automate builds with GitHub Actions
If your site requires a build step, create `.github/workflows/gh-pages.yml` similar to the snippet below. Static sites like this one can omit the build step and just deploy the `docs/` folder.

```yaml
name: Build and Deploy Site
on:
  push:
    branches: [ main ]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # Add build commands here if needed
      - name: Deploy to Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

## 5. Preview locally
- Open `docs/index.html` directly in your browser for a quick preview.
- For Jekyll or other SSGs, run their local server commands.

## 6. Go live & iterate
- Visit the URL shown under **Settings > Pages** to view the live site.
- GitHub automatically provisions HTTPS certificates for `github.io` domains.
- Update your files and push to keep the public site in sync.

---

Happy publishing!

## Components
Reusable UI components are stored in the `/components` directory. Each HTML file contains markup and scoped styles for a single element such as the MenuBar or SignupForm.

## API Server

This repo includes a small Express server that exposes page content via JSON. To run it locally:

```bash
npm install
npm start
```

The server provides a couple endpoints:

```
GET /api/content/:pageName
```

which returns the contents of `content/<pageName>.json`.

```
POST /api/edit/:pageName
```

Sends the current JSON and a user prompt to the Gemini API to modify the page
content. The request body must include a `prompt` field. The updated JSON is
saved back to `content/<pageName>.json` and returned in the response. Set the
`GEMINI_API_KEY` environment variable so the server can call the API.
