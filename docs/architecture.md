# Harf-Öğren Architecture Document

## Introduction

This document outlines the project architecture for Harf-Öğren - a **local-first** Turkish PWA focused on studying Arabic, Russian, Ottoman Turkish-specific, and Persian-specific letters. The goal is to create an effective, resilient learning tool integrated with the existing live application (`https://harf-ogren.netlify.app/`). The application prioritizes storing user data directly on the device using `localStorage` for simplicity and offline access.

### Project Overview

The project is an existing SvelteKit 5 Progressive Web App (PWA) with enhancements including:

- **Letter learning interface** for Arabic, Russian, Ottoman Turkish-specific, and Persian-specific alphabets/sets
- **Quiz mode** with audio-based letter recognition
- **Audio playback** for letter pronunciation
- **Basic progress tracking**
- **Mobile-first responsive design**
- **Offline capability** through PWA features
- **Enhanced UI engagement** through subtle animations on letter cards using `svelte/animate`
- **Local-First Data:** User progress is primarily stored and managed on the device using `localStorage`.

## High Level Architecture

### Technical Summary

The Harf-Öğren system employs a **local-first** progressive web application (PWA) architecture built on SvelteKit 5 with TypeScript. User data resides primarily on the device (`localStorage`), ensuring basic offline functionality for progress tracking. This document reflects updates to include Ottoman Turkish-specific and Persian-specific letter sets, UI animations, and refined coding standards for ongoing development.

### High Level Overview

1.  **Architectural Style:** Progressive Web Application (PWA) with SvelteKit 5
2.  **Repository Structure:** Single codebase frontend
3.  **Service Architecture:** Static hosting for frontend (Netlify)
4.  **Primary User Flows:**
    - **Study Mode:** User selects language/set (Arabic, Russian, Ottoman, Persian) → Views letter grid → Clicks letters to hear pronunciation
    - **Quiz Mode:** User selects language/set → Hears random letter → Chooses correct letter from options → Progress tracking
5.  **Key Architectural Decisions:** Simple audio playback, quiz-based learning, **simple local data storage (`localStorage`)**, extendable alphabet structure, enhanced UI via animations, functional programming principles where practical.

## Tech Stack

### Infrastructure

- **Provider:** Netlify
- **Key Services:** Static hosting, PWA support
- **Deployment Regions:** Global CDN

### Technology Stack

| Category          | Technology       | Version    | Purpose                     | Rationale                                              |
| :---------------- | :--------------- | :--------- | :-------------------------- | :----------------------------------------------------- |
| **Framework**     | SvelteKit        | 5.x        | Frontend framework          | Modern, performant, excellent developer experience     |
| **Language**      | TypeScript       | 5.x        | Development language        | Type safety, better tooling                            |
| **Styling**       | Tailwind CSS     | ^4.1.14    | CSS framework               | Utility-first, rapid development                       |
| **Animation**     | `svelte/animate` | Built-in   | UI Animations               | Smooth transitions and enhanced engagement             |
| **Local Storage** | `localStorage`   | Native     | Client-side key-value store | Simple local-first progress tracking for current scope |
| **Deployment**    | Netlify          | Latest     | Hosting platform            | Excellent PWA support                                  |
| **UI Language**   | Turkish-only     | N/A        | UI language                 | Simplified single-language app                         |
| **Build/Package** | Vite             | Latest     | Build tool (via SvelteKit)  | Fast build times                                       |
| **Linting**       | ESLint/Prettier  | Configured | Code quality & consistency  | Standard tooling                                       |

## Data Models

_(`alphabet-definition.ts` ve `user-progress.ts` dosyalarındaki yapılar referans alınmıştır)_

### AlphabetSet (Updated Concept)

**Purpose:** Defines a collection of letters for learning (Arabic, Russian, Ottoman-specific, Persian-specific).

**Key Attributes:**

- `id`: string - Unique identifier (e.g., 'ar', 'ru', 'ot', 'fa')
- `name`: string - Display name (e.g., 'Arapça', 'Rusça', 'Osmanlıca Harfler')
- `letters`: Letter[] - Array of letters in the set

### Letter

**Purpose:** Represents a single learnable letter.

**Key Attributes:**

- `id`: string - Unique identifier within the set (e.g., 'alif', 'pe')
- `symbol`: string - The character symbol (e.g., 'ا', 'پ')
- `name`: string - Turkish name/description (e.g., 'Elif', 'Pe')
- `pronunciation?`: string - Turkish pronunciation description

### UserProgress

**Purpose:** Tracks basic user learning progress per set. Matches `user-progress.ts` structure.

**Key Attributes:**

- `setId`: string - Target alphabet/set ID ('ar', 'ru', 'ot', 'fa') (Update needed in `user-progress.ts`)
- `learnedLetters`: string[] - Array of learned letter IDs within the set
- `lastActive`: string - ISO string timestamp of last activity

**Storage:** **`localStorage`** (likely using a key per set, e.g., `progress_ar`, `progress_ot`)

## Components

### ProgressTracker (Service)

**Responsibility:** Manages user progress tracking per alphabet set using `localStorage`. Reflects current `progress.store.ts` logic.

**Key Interfaces:** (Synchronous, matching existing pattern)

- `markLetterLearned(letterId: string, setId: string): void`
- `getLearnedLetters(setId: string): string[]`
- `resetProgress(setId: string): void`
- `getProgress(setId: string): UserProgress`
- `isLetterLearned(letterId: string, setId: string): boolean`

**Dependencies:** **`localStorage` API**, Alphabet definitions, `user-progress.ts` model
**Technology Stack:** **`localStorage`**, TypeScript

### AudioService

**Responsibility:** Plays letter pronunciation audio for all sets.

**Key Interfaces:**

- `playLetterSound(letterId: string, setId: string): void`
- `setVolume(level: number): void`

**Dependencies:** Web Audio API, Audio files (`static/audio/letters/[setId]/`)
**Technology Stack:** Web Audio API, pre-recorded audio files

### QuizService

**Responsibility:** Generates quiz questions and manages quiz logic for all sets.

**Key Interfaces:**

- `generateQuestion(setId: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion`
- `validateAnswer(question: QuizQuestion, selectedLetterId: string): boolean`
- `getNextQuestion(setId: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion`

**Dependencies:** Alphabet definitions, AudioService, ProgressTracker
**Technology Stack:** TypeScript, Svelte stores

### LetterCard

**Responsibility:** Displays a single letter, plays audio on click, indicates learned status, includes subtle animation.

**Key Features:**

- Displays letter `symbol` and `name`.
- Plays audio via `AudioService` on interaction.
- Visual state for learned/not learned (fetched via `ProgressTracker`).
- Uses `svelte/animate` for transitions (e.g., flip, fade) on state changes or interactions.

### SetSelector (Updated from LanguageSelector)

**Responsibility:** Allows user to select the alphabet/letter set to study (Arabic, Russian, Ottoman, Persian).

**Dependencies:** Alphabet definitions, UI Text Constants

## Storage Schema

_(Reflects `localStorage` structure using JSON stringification)_

```javascript
// Example localStorage keys and their stringified JSON values

// Key: "progress_ar"
// Value: '{"setId":"ar","learnedLetters":["alif","ba"],"lastActive":"2025-10-20T10:00:00.000Z"}'

// Key: "progress_ot"
// Value: '{"setId":"ot","learnedLetters":["peh"],"lastActive":"2025-10-20T10:05:00.000Z"}'

// Key: "progress_fa"
// Value: '{"setId":"fa","learnedLetters":[],"lastActive":"2025-10-20T10:06:00.000Z"}'

// Key: "progress_ru"
// Value: '{"setId":"ru","learnedLetters":["a","b","v"],"lastActive":"2025-10-20T10:07:00.000Z"}'

// Alphabet definitions remain in code (alphabet-definition.ts)
// const alphabetsData = { ... };
```

## Source Tree

```
harf-ogren/
├── src/
│   ├── lib/
│   │   ├── services/
│   │   │   ├── progress-tracker.ts   # Uses localStorage
│   │   │   ├── audio-service.ts
│   │   │   └── quiz-service.ts
│   │   ├── stores/
│   │   │   └── progress.store.ts     # Interacts with ProgressTracker
│   │   ├── models/
│   │   │   ├── alphabet-definition.ts # Extended with ot, fa types/data
│   │   │   └── user-progress.ts      # Update 'language' to 'setId'
│   │   ├── components/
│   │   │   ├── SetSelector.svelte        # Updated from LanguageSelector
│   │   │   ├── LetterGrid.svelte
│   │   │   ├── LetterCard.svelte         # Includes svelte/animate usage
│   │   │   ├── ProgressIndicator.svelte
│   │   │   └── Quiz.svelte
│   │   └── utils/
│   │       ├── constants.ts              # Extended with UI_TEXT for new sets
│   │       └── helpers.ts
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte                  # Home/Set selection
│   │   ├── learn/[setId]/                # Updated route parameter
│   │   │   └── +page.svelte              # Letter learning page
│   │   └── quiz/[setId]/                 # Updated route parameter
│   │       └── +page.svelte              # Quiz page
│   └── app.html
├── static/
│   ├── audio/
│   │   └── letters/
│   │       ├── ar/
│   │       ├── ru/
│   │       ├── ot/                       # Ottoman-specific audio files (to be added)
│   │       └── fa/                       # Persian-specific audio files (to be added)
│   └── icons/
└── tests/
    └── unit/
        └── services/             # Update progress-tracker tests
```

## Development Guidelines

### Coding Standards

- **Languages:** TypeScript 5.x
- **Styling:** Tailwind CSS ^4.1.14
- **Linting:** ESLint + Prettier with SvelteKit defaults
- **Functional Principles:**
  - Prefer immutability where practical.
  - Minimize side effects in utility functions.
  - Avoid complex class inheritance structures; favor composition.
  - Use declarative approaches (e.g., array methods like `map`, `filter`, `reduce`) over imperative loops (`for`, `while`) where it enhances readability and maintainability.
  - Consider error handling libraries like `NeverThrow` for predictable error flows, especially in services interacting with storage or external APIs (though none currently exist).

### Core Principles

- **Simple Design:** Focus on essential letter learning functionality.
- **Local-First (Simple):** Prioritize data storage and access on the user's device using `localStorage` for resilience and basic offline capability.
- **Extendable:** Allow easy addition of new letter sets in the future.
- **Turkish Language:** All UI text in Turkish, managed via `constants.ts`.
- **Mobile-First:** Responsive design for mobile devices.
- **Offline Capable:** Basic PWA functionality leveraging `localStorage`.
- **Engaging UI:** Utilize subtle animations for better feedback and engagement.

## Implementation Priority

1.  **Core Features (Data Layer Adaptation):**
    - **Model Update:** Refactor `user-progress.ts` interface and functions to use `setId` instead of `language`.
    - **Progress Tracking Refactor:** Update `ProgressTracker` service and `progress.store.ts` to handle multiple sets using distinct `localStorage` keys (e.g., `progress_${setId}`) and use the updated `setId` field. Update components consuming progress data.
    - **Data Structure Update:** Extend `alphabet-definition.ts` and related types/functions for 'ot' and 'fa'. Define the actual letters for these sets.
    - **Constants Update:** Add UI text for new sets in `constants.ts`.
    - **Set Selection:** Update `LanguageSelector` to `SetSelector` component to include new options dynamically from alphabet definitions.
    - **Routing Update:** Adjust SvelteKit routes to use `[setId]` parameter instead of `[language]`.
    - **Audio Integration:** Add new audio files to `static/audio/letters/ot/` and `static/audio/letters/fa/`. Update `AudioService` logic (if needed, e.g., path generation) and `getAudioFileName` map in `alphabet-definition.ts`.
    - **Study Mode Update:** Ensure `LetterGrid` displays the selected set correctly based on the `setId` route parameter and fetches progress via the updated tracker.
    - **Quiz Mode Update:** Update `QuizService` to generate questions based on the `setId`. Ensure it interacts correctly with the `ProgressTracker`.
    - **Animation:** Implement basic animation in `LetterCard` using `svelte/animate`.
2.  **Polish:**
    - Refine animations for smoothness and performance.
    - Ensure consistent functional coding patterns in new/refactored code, potentially applying `NeverThrow` where beneficial.
    - Verify responsive design across all letter sets.
    - Test PWA offline capability thoroughly with the updated `localStorage` structure.
