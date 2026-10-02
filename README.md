# Tic-Tac-Hop

Tic-tac-toe on a 3x3 grid with a twist:

1. Each player has only 3 pieces (X and O).
2. Players place their first 3 pieces on empty cells.
3. After that, on your turn you pick one of your pieces and hop it to any empty cell.
4. Three in a line (row, column or diagonal) wins.

Built with plain React + Vite (JavaScript, no TypeScript). It is also an
installable web app (PWA), so it can be added to an Android home screen.

## Project structure

```
tic-tac-hop/
  index.html                  page shell, manifest link, theme colour
  netlify.toml                Netlify build settings
  package.json
  vite.config.js
  public/
    manifest.webmanifest      app name, icons, colours (PWA)
    sw.js                     service worker (offline support)
    icon-192.png, icon-512.png
  src/
    main.jsx                  entry point, registers the service worker
    App.jsx                   ALL the game logic and UI
    App.css                   styles
```

Most changes happen in `src/App.jsx` (rules) and `src/App.css` (looks).

## Run locally

You need Node.js 18 or newer.

```
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Deploy to Netlify

### Option A: GitHub + Netlify (recommended, auto-updates when you push)

1. Create a new repository on GitHub and push this folder to it:
   ```
   git init
   git add .
   git commit -m "Tic-Tac-Hop"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tic-tac-hop.git
   git push -u origin main
   ```
2. Sign up or log in at https://app.netlify.com (using your GitHub account is easiest).
3. Click "Add new project" and choose "Import an existing project".
4. Pick GitHub, authorize Netlify if asked, and select your `tic-tac-hop` repo.
5. The build settings are read from `netlify.toml`. Check that they say:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click Deploy. After a minute you get a link like `https://something.netlify.app`.
7. From now on, every `git push` to `main` redeploys the site automatically.

### Option B: Drag and drop (no GitHub)

1. Run `npm install` and then `npm run build`. This creates a `dist` folder.
2. Open https://app.netlify.com/drop and drag the `dist` folder onto the page.
3. You get a link. To update later, build again and drop the new `dist` folder.

### Option C: Netlify CLI

```
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```
The first time, it asks you to create or link a site.

(Netlify's screens change now and then, so button names may differ slightly.)

## Install on Android

1. Open your Netlify link in Chrome on your Android phone.
2. Tap the three-dot menu, then "Install app" (or "Add to Home screen").
3. Open it from your home screen. It runs full screen and works offline after
   the first load.

After you deploy an update, open the app once with internet so it can fetch the
new version (close and reopen it if you still see the old one).

## Renaming the app

Change the name in these places: `index.html` (`<title>`), `src/App.jsx` (the
`<h1>`), `public/manifest.webmanifest` (`name` and `short_name`) and
`package.json` (`name`).
