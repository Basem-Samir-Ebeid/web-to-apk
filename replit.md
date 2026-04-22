# WebToApp

This project is a native **Android application** built with Kotlin and Jetpack Compose (Gradle build system). It converts websites, media, and HTML into standalone Android APKs.

## Replit Setup

Because this is an Android project (not a web app), it cannot truly "run" inside Replit's web preview. To give the Replit preview pane something useful to display, a small static landing page in `site/` is served on port 5000 via Python's built-in HTTP server. It shows the project description and the screenshots from `png/`.

### Workflow
- **Start application**: `python3 -m http.server 5000 --bind 0.0.0.0 --directory site`

### Building the actual Android APK
Requires the Android SDK (not installed here). On a machine with the SDK:

```
./gradlew assembleDebug
```

APK output: `app/build/outputs/apk/`

## Project layout
- `app/` — Android app module (Kotlin sources, resources, manifests)
- `build.gradle.kts`, `settings.gradle.kts`, `gradle.properties` — Gradle config
- `png/` — README screenshots
- `site/` — Static preview page served in Replit
- `tools/` — Utility scripts (e.g. i18n catalog export)
