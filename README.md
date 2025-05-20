# Journal PWA

This repository contains a minimal Progressive Web App (PWA) for journalling and simple task tracking. The app stores data locally so it works offline and can be installed on desktop or mobile devices.

## Features
- Add journal entries and view previous notes.
- Simple task list with clickable items to mark them done.
- Random motivational quotes.
- Offline caching via a service worker.
- Daily writing prompts to inspire new entries.
- Attach optional audio recordings and photos to a note.
- Basic streak counter to track consecutive writing days.
- Placeholder encryption routines for stored text.

## Usage
Open `pwa/index.html` in a modern browser. You can optionally serve the folder with a static server to enable service worker features.

### Install as App
On most browsers you can install the PWA by using the "Add to Home Screen" option.

## Development
Files of interest are located in the `pwa` directory:
- `index.html` – main UI
- `styles.css` – basic styling
- `app.js` – logic for entries, tasks and media
- `service-worker.js` – offline support

This project is a starting point and does not include backend synchronization or authentication. It can be extended with AI features or cloud backups.

