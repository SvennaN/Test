# Mindful Motion

A simple Progressive Web App built with React for journalling and task management. Data is stored locally so the app works offline and can be installed on desktop or mobile devices.

## Features
- Random motivational quotes and daily prompts
- Journal entries with mood selection, photos and audio recordings
- Streak counter and affirmation after saving an entry
- Kanban board for task management with progress indicator
- Basic statistics such as task completion rate
- Works offline thanks to a service worker

## Usage
Open `pwa/index.html` in a modern browser. Because the app uses React via CDN, you can simply open the file or serve the folder with a static server to enable the service worker.

### Install as App
Most browsers let you install the PWA via "Add to Home Screen".

## Development
Key files in the `pwa` directory:
- `index.html` – loads React and mounts the app
- `styles.css` – layout and styling
- `app.js` – React components and application logic
- `service-worker.js` – offline caching

The project has no build step and can be extended with additional features or API integrations.
