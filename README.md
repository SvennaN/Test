# Journal PWA

This repository contains a Progressive Web App (PWA) for journalling and simple task tracking. It stores data locally so it works offline and can be installed on desktop or mobile devices.

## Features
- Add journal entries with optional audio recordings and photos.
- Daily prompts and motivational sport quotes.
- Tracks your writing streak with simple gamification.
- Simple task list with clickable items to mark them done.
- Offline caching via a service worker.

## Usage
Open `pwa/index.html` in a modern browser. You can optionally serve the folder with a static server to enable service worker features.

## Install as App
On most browsers you can install the PWA by using the "Add to Home Screen" option.

## Run Tests
With Node.js installed, run `node tests/test.js` to execute a small test suite for utility functions.

## Development
Files of interest are located in the `pwa` directory:
- `index.html` – main UI  
- `styles.css` – basic styling  
- `app.js` – logic for entries and tasks  
- `service-worker.js` – offline support

This project is a starting point and does not include backend synchronization or authentication. Notes are stored locally and a placeholder encryption routine is provided that can be replaced with real AES encryption. It can be extended with AI features or cloud backups.
