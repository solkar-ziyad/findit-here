# FindIt Here

A mobile-first civic lost-and-found board for parks, transit hubs, campuses, libraries, malls, beaches, caf‚s and public spaces. It uses only HTML, CSS and vanilla JavaScript modules. There is no backend, account, tracking, cookie or API key.

## Screenshots

Screenshots are not committed. To add them, run the site locally, capture the home, browse, report and detail views at desktop and mobile widths, save optimized PNGs in a screenshots folder, then link them here.

## Features

- Landing page with community counts, recent reports, public-space tiles, steps and FAQ.
- Search and filters, sorting, list/grid/map views, item details and possible matches.
- Lost/found reporting, draft persistence, client-side photo resizing, geolocation and map pins.
- Private contact details, salted SHA-256 verification answer, three-attempt claim lock.
- Local JSON export/import and compressed share links.
- Printable poster and locally generated QR code.
- Light/dark/auto theme, English/Hindi labels, larger text, reduced motion.
- Device-local moderation and tests.html browser checks.

## Stack and files

HTML5, CSS3, JavaScript ES modules, localStorage, Web Crypto, Canvas, optional Leaflet 1.9.4, OpenStreetMap tiles, Google Fonts.

index.html is the shell. css contains tokens, base, components, page and print styles. js/config.js holds categories and demo PIN; storage.js wraps versioned localStorage; store.js handles state; router.js handles hash paths; matcher.js is pure scoring; map.js lazy-loads Leaflet; qr.js creates QR codes; i18n.js provides labels; ui.js provides safe DOM helpers; js/pages contains each route. data/seed.json contains 24 reports with relative daysAgo dates. assets contains the favicon.

## Run locally

Use VS Code Live Server, or run python -m http.server 8000 in this folder and open http://localhost:8000/. A local server enables JSON fetch, modules and browser storage. file:// uses inline sample fallback data. Geolocation and clipboard may require HTTPS or localhost.

## GitHub Pages

1. Create a GitHub repository.
2. Upload the files or push them to the main branch.
3. Open Settings  Pages.
4. Choose Deploy from a branch.
5. Select branch main and folder /root, then save.
6. Wait for deployment; the live URL is shown in Pages settings, usually https://YOUR-NAME.github.io/YOUR-REPOSITORY/.

All assets use relative paths and routes use URL hashes, so nested repository paths refresh safely.

## Matching score

Opposite-type reports receive a weighted score: category 30%, color 14%, brand 14%, shared title/description words 20%, date proximity 10%, geographic distance 12%. Missing details use neutral values. A match is a conversation lead, not identity proof.

## Limits and privacy

Demo mode: data is saved on this device only. Browser storage can be cleared or fill up, especially with photos. Export/import moves snapshots but does not synchronize later edits. The moderation PIN is visible in source and is not security. Map tiles and Google Fonts need a network connection. Public share links exclude contact and verification data.

## Customize

Change colors in css/tokens.css. Edit categories/place types and moderation PIN in js/config.js. Add translations in js/i18n.js. Modify data/seed.json; daysAgo is converted to a fresh date at initialization.

## Roadmap

A production version could add optional Firebase or Supabase for community sync, moderator roles, backups and real-time notices, while preserving consent, deletion and private contact controls.
