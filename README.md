# Journal PWA

This repository contains a minimal Progressive Web App (PWA) for journalling and simple task tracking. The app stores data locally so it works offline and can be installed on desktop or mobile devices.

## Features
- Add journal entries and view previous notes.
- Simple task list with clickable items to mark them done.
- Random motivational quotes.
- Offline caching via a service worker.
- Optional photo attachments and audio recordings.
- Daily writing prompts and streak tracking with small badge alerts.

## Usage
Open `pwa/index.html` in a modern browser. You can optionally serve the folder with a static server to enable service worker features.

Allow microphone access if you want to record audio notes. Images are stored using the file picker. All data is saved locally in your browser.

### Install as App
On most browsers you can install the PWA by using the "Add to Home Screen" option.

## Development
Files of interest are located in the `pwa` directory:
- `index.html` – main UI
- `styles.css` – basic styling
- `app.js` – logic for entries, tasks and media handling
- `service-worker.js` – offline support

This project is a starting point and does not include backend synchronization or encryption. It can be extended with AI services and cloud backups.

