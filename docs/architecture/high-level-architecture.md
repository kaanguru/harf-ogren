# High Level Architecture

## Technical Summary

The Harf-Öğren system employs a **local-first** progressive web application (PWA) architecture built on SvelteKit 5 with TypeScript. User data resides primarily on the device (`localStorage`), ensuring basic offline functionality for progress tracking. This document reflects updates to include Ottoman Turkish-specific and Persian-specific letter sets, UI animations, and refined coding standards for ongoing development.

## High Level Overview

1.  **Architectural Style:** Progressive Web Application (PWA) with SvelteKit 5
2.  **Repository Structure:** Single codebase frontend
3.  **Service Architecture:** Static hosting for frontend (Netlify)
4.  **Primary User Flows:**
    - **Study Mode:** User selects language/set (Arabic, Russian, Ottoman, Persian) → Views letter grid → Clicks letters to hear pronunciation
    - **Quiz Mode:** User selects language/set → Hears random letter → Chooses correct letter from options → Progress tracking
5.  **Key Architectural Decisions:** Simple audio playback, quiz-based learning, **simple local data storage (`localStorage`)**, extendable alphabet structure, enhanced UI via animations, functional programming principles where practical.
