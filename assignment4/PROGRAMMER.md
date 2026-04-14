# Ocean Echo Explorer: Programmer JSON Guide

## Goal
Customize the learning content by editing `data/topics.json` without changing core JavaScript.

## JSON Structure
The file has app metadata and a `topics` array.

```json
{
  "appName": "Ocean Echo Explorer",
  "userProfile": {
    "learnerName": "Guest Learner",
    "level": "Beginner"
  },
  "topics": [
    {
      "id": "reef",
      "title": "Coral Reefs",
      "description": "...",
      "quickFact": "...",
      "image": "./assets/topics/reef.svg",
      "imageAlt": "...",
      "audio": {
        "mode": "tts",
        "text": "..."
      }
    }
  ]
}
```

## Required Fields Per Topic
- `id`: unique short id.
- `title`: shown in the menu and content panel.
- `description`: learning text.
- `image`: image path or URL.
- `audio`: object with narration settings.

## Audio Modes
- `tts`: uses the browser Speech Synthesis API.
- `file`: uses an audio file URL.

Example with file playback:
```json
"audio": {
  "mode": "file",
  "url": "./assets/audio/new-topic.mp3",
  "text": "Fallback narration text if file fails"
}
```

## Add a New Topic
1. Duplicate an existing topic object.
2. Change `id`, `title`, `description`, and `quickFact`.
3. Add a new image file and update `image` path.
4. Update `audio` values.
5. Save JSON and refresh the app.

## Common Mistakes
- Missing commas between fields.
- Duplicate `id` values.
- Incorrect image/audio path.
- Invalid JSON quotes (must use double quotes).
