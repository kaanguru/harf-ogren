# Harf Öğren Android Wrapper

This is the Android wrapper for the Harf Öğren web application, created using Bubblewrap to package the Progressive Web App (PWA) for the Android platform.

## Overview

Harf Öğren is an educational application designed to help users learn Arabic and Russian alphabets through interactive lessons and quizzes. This Android wrapper allows users to install and use the PWA as a native Android application through app stores like F-Droid.

## Project Structure

- `android/` - Android project created by Bubblewrap
- `twa-manifest.json` - Configuration for the Trusted Web Activity
- `assetlinks.json` - Digital asset links for Android app verification

## Building

To build this project, you need to have Bubblewrap installed:

```bash
npm install -g @bubblewrap/cli
```

Then update and build:

```bash
bubblewrap update
bubblewrap build
```

## Configuration

The wrapper is configured to:
- Use the PWA at https://harf-ogren.netlify.app
- Display in standalone mode
- Include proper icons and splash screen
- Support offline functionality (as provided by the web app)

## License

This wrapper is distributed under the same license as the original Harf Öğren project.

The original web application is available at: https://github.com/kaanGuru/harf-ogren