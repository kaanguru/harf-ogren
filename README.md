# Harf-Öğren - Simplified Turkish PWA

A Progressive Web App for studying Arabic and Russian letters, designed with a mobile-first approach.

## Project Overview

Harf-Öğren is a SvelteKit Progressive Web App (PWA) built with:
- **SvelteKit 5** framework with TypeScript
- **Tailwind CSS** for styling
- **Netlify adapter** for deployment
- **Responsive layout** optimized for mobile devices
- **Audio files** for Arabic and Russian letter pronunciation

## Features

- Language selection (Arabic/Russian)
- Interactive letter grid with audio playback
- Basic progress tracking
- PWA offline capability for learning without internet
- Mobile-first responsive design

## Developing

Once you've installed dependencies with `pnpm install`, start a development server:

```sh
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> The app is configured for deployment to Netlify with offline capability.
