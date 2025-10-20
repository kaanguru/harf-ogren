# Introduction

This document outlines the project architecture for Harf-Öğren - a **local-first** Turkish PWA focused on studying Arabic, Russian, Ottoman Turkish-specific, and Persian-specific letters. The goal is to create an effective, resilient learning tool integrated with the existing live application (`https://harf-ogren.netlify.app/`). The application prioritizes storing user data directly on the device using `localStorage` for simplicity and offline access.

## Project Overview

The project is an existing SvelteKit 5 Progressive Web App (PWA) with enhancements including:

- **Letter learning interface** for Arabic, Russian, Ottoman Turkish-specific, and Persian-specific alphabets/sets
- **Quiz mode** with audio-based letter recognition
- **Audio playback** for letter pronunciation
- **Basic progress tracking**
- **Mobile-first responsive design**
- **Offline capability** through PWA features
- **Enhanced UI engagement** through subtle animations on letter cards using `svelte/animate`
- **Local-First Data:** User progress is primarily stored and managed on the device using `localStorage`.
