# Ocean Echo Explorer: Feature Documentation

## Overview
Ocean Echo Explorer is an educational Progressive Web App (PWA) focused on marine life topics. It is designed for quick topic browsing, image-based learning, and audio narration.

## Main Features
- Dynamic topic menu generated from `data/topics.json`.
- Topic display panel with title, image, description, and quick fact.
- Audio support using Web Speech API narration.
- Installable PWA with a web app manifest.
- Offline support using a service worker cache.

## How to Use
1. Open `app.html` in a supported browser.
2. Select a topic from the menu.
3. Use:
   - `Play Topic Audio` for narration,
   - `Read Description` to read the full text,
   - `Toggle Quick Fact` to show or hide extra info.
4. If the browser supports installation, click `Install App`.

## Installation Process
1. Visit the app in a secure context (HTTPS or localhost).
2. Wait for the browser to trigger install availability.
3. Click `Install App` and accept.
4. Launch it like a normal app from home screen or app launcher.

## Offline Behavior
The service worker caches the app shell and dataset. After first load, the app can reopen without network connectivity.
