# Harf-Öğren Simplified Architecture Document

## Introduction

This document outlines the simplified project architecture for Harf-Öğren - a Turkish PWA focused on studying Arabic and Russian letters. The goal is to create a minimal, effective learning tool without complex features.

### Project Overview

The project is a SvelteKit 5 Progressive Web App (PWA) with:

- **Letter learning interface** for Arabic and Russian alphabets
- **Quiz mode** with audio-based letter recognition
- **Audio playback** for letter pronunciation
- **Basic progress tracking**
- **Mobile-first responsive design**
- **Offline capability** through PWA features

## High Level Architecture

### Technical Summary

The Harf-Öğren system employs a progressive web application (PWA) architecture built on SvelteKit 5 with TypeScript. The simplified architecture focuses on basic letter learning with audio playback and minimal tracking.

### High Level Overview

1. **Architectural Style:** Progressive Web Application (PWA) with SvelteKit 5
2. **Repository Structure:** Single codebase frontend
3. **Service Architecture:** Static hosting for frontend
4. **Primary User Flows:**
   - **Study Mode:** User selects language → Views letter grid → Clicks letters to hear pronunciation
   - **Quiz Mode:** User selects language → Hears random letter → Chooses correct letter from options → Progress tracking
5. **Key Architectural Decisions:** Simple audio playback, quiz-based learning, minimal data storage

## Tech Stack

### Simplified Infrastructure

- **Provider:** Netlify
- **Key Services:** Static hosting, PWA support
- **Deployment Regions:** Global CDN

### Simplified Technology Stack

| Category          | Technology   | Version | Purpose              | Rationale                                          |
| ----------------- | ------------ | ------- | -------------------- | -------------------------------------------------- |
| **Framework**     | SvelteKit    | 5.x     | Frontend framework   | Modern, performant, excellent developer experience |
| **Language**      | TypeScript   | 5.x     | Development language | Type safety, better tooling                        |
| **Styling**       | Tailwind CSS | 4.x     | CSS framework        | Utility-first, rapid development                   |
| **Local Storage** | localStorage | Native  | Client-side storage  | Simple progress tracking                           |
| **Deployment**    | Netlify      | Latest  | Hosting platform     | Excellent PWA support                              |
| **Language**      | Turkish-only | N/A     | UI language          | Simplified single-language app                     |

## Simplified Data Models

### UserProgress (Simplified)

**Purpose:** Tracks basic user learning progress

**Key Attributes:**

- `language`: string - Target alphabet language (ar, ru)
- `learnedLetters`: string[] - Array of learned letter IDs
- `lastActive`: Date - Timestamp of last activity

**Storage:** localStorage for simplicity

## Components

### ProgressTracker

**Responsibility:** Manages user progress tracking

**Key Interfaces:**

- `markLetterLearned(letter: string, language: string): void`
- `getLearnedLetters(language: string): string[]`
- `resetProgress(language: string): void`
- `getProgressPercentage(language: string, totalLetters: number): number`

**Dependencies:** localStorage

**Technology Stack:** localStorage, Svelte stores

### AudioService

**Responsibility:** Plays letter pronunciation audio

**Key Interfaces:**

- `playLetterSound(letter: string, language: string): void`
- `setVolume(level: number): void`

**Dependencies:** Web Audio API, Audio files

**Technology Stack:** Web Audio API, pre-recorded audio files

### QuizService

**Responsibility:** Generates quiz questions and manages quiz logic

**Key Interfaces:**

- `generateQuestion(language: 'ar' | 'ru', difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion`
- `validateAnswer(question: QuizQuestion, selectedLetterId: string): boolean`
- `getNextQuestion(language: 'ar' | 'ru', difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion`

**Dependencies:** Alphabet definitions, AudioService

**Technology Stack:** TypeScript, Svelte stores

## Simplified Storage Schema

### localStorage Schema

```javascript
// Simple progress tracking
const userProgress = {
	language: 'ar', // or 'ru'
	learnedLetters: ['alif', 'ba', 'taa'], // letter IDs
	lastActive: '2025-10-15T10:30:00Z'
};

// Language alphabet definitions
const alphabets = {
	ar: {
		name: 'Arabic',
		letters: [
			{ id: 'alif', symbol: 'ا', name: 'Elif' },
			{ id: 'ba', symbol: 'ب', name: 'Be' }
			// ... all Arabic letters
		]
	},
	ru: {
		name: 'Russian',
		letters: [
			{ id: 'a', symbol: 'А', name: 'A' },
			{ id: 'b', symbol: 'Б', name: 'Be' }
			// ... all Russian letters
		]
	}
};
```

## Source Tree

```
harf-ogren/
├── src/
│   ├── lib/
│   │   ├── services/
│   │   │   ├── progress-tracker.ts      # Progress tracking service
│   │   │   ├── audio-service.ts          # Audio playback service
│   │   │   └── quiz-service.ts           # Quiz generation and logic
│   │   ├── stores/
│   │   │   └── progress.store.ts         # Progress state management
│   │   ├── models/
│   │   │   ├── alphabet-definition.ts    # Letter definitions
│   │   │   └── user-progress.ts          # Progress model
│   │   ├── components/
│   │   │   ├── LanguageSelector.svelte   # Language selection (Arabic/Russian)
│   │   │   ├── LetterGrid.svelte        # Letter display grid
│   │   │   ├── LetterCard.svelte        # Individual letter card
│   │   │   ├── ProgressIndicator.svelte # Progress display
│   │   │   └── Quiz.svelte              # Quiz component
│   │   └── utils/
│   │       ├── constants.ts              # App constants (Turkish text)
│   │       └── helpers.ts                # Utility functions
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte                  # Home/Language selection
│   │   ├── learn/[language]/
│   │   │   └── +page.svelte              # Letter learning page
│   │   └── quiz/[language]/
│   │       └── +page.svelte              # Quiz page
│   └── app.html
├── static/
│   ├── audio/
│   │   └── letters/
│   │       ├── ar/                      # Arabic letter audio files
│   │       └── ru/                      # Russian letter audio files (to be added)
│   └── icons/
└── tests/
    └── unit/
        └── services/
```

## Simplified Infrastructure

### Deployment

- **Platform:** Netlify
- **Strategy:** Continuous deployment via Git
- **Configuration:** `netlify.toml`

### Environments

- **Production:** https://harf-ogren.netlify.app
- **Development:** Local development with `npm run dev`

## Simplified Development Guidelines

### Coding Standards

- **Languages:** TypeScript 5.x
- **Styling:** Tailwind CSS
- **Linting:** ESLint + Prettier with SvelteKit defaults

### Core Principles

- **Simple Design:** Focus on essential letter learning functionality
- **Turkish Language:** All UI text in Turkish
- **Mobile-First:** Responsive design for mobile devices
- **Offline Capable:** PWA functionality for offline use

## Implementation Priority

1. **Core Features:**
   - Language selection (Arabic/Russian)
   - Letter grid with audio playback (Study Mode)
   - Quiz mode with multiple-choice questions
   - Audio-based letter recognition
   - Progress tracking
   - PWA setup

2. **Polish:**
   - Responsive design
   - Performance optimization
   - Basic error handling
   - Difficulty levels (Easy: 3 options, Medium: 4 options, Hard: 6 options)

The architecture provides a comprehensive Turkish PWA for learning Arabic and Russian letters through both study and quiz modes, focusing on effective learning through audio recognition.
