# Components

## ProgressTracker (Service)

**Responsibility:** Manages user progress tracking per alphabet set using `localStorage`. Reflects current `progress.store.ts` logic.

**Key Interfaces:** (Synchronous, matching existing pattern)

- `markLetterLearned(letterId: string, setId: string): void`
- `getLearnedLetters(setId: string): string[]`
- `resetProgress(setId: string): void`
- `getProgress(setId: string): UserProgress`
- `isLetterLearned(letterId: string, setId: string): boolean`

**Dependencies:** **`localStorage` API**, Alphabet definitions, `user-progress.ts` model
**Technology Stack:** **`localStorage`**, TypeScript

## AudioService

**Responsibility:** Plays letter pronunciation audio for all sets.

**Key Interfaces:**

- `playLetterSound(letterId: string, setId: string): void`
- `setVolume(level: number): void`

**Dependencies:** Web Audio API, Audio files (`static/audio/letters/[setId]/`)
**Technology Stack:** Web Audio API, pre-recorded audio files

## QuizService

**Responsibility:** Generates quiz questions and manages quiz logic for all sets.

**Key Interfaces:**

- `generateQuestion(setId: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion`
- `validateAnswer(question: QuizQuestion, selectedLetterId: string): boolean`
- `getNextQuestion(setId: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion`

**Dependencies:** Alphabet definitions, AudioService, ProgressTracker
**Technology Stack:** TypeScript, Svelte stores

## LetterCard

**Responsibility:** Displays a single letter, plays audio on click, indicates learned status, includes subtle animation.

**Key Features:**

- Displays letter `symbol` and `name`.
- Plays audio via `AudioService` on interaction.
- Visual state for learned/not learned (fetched via `ProgressTracker`).
- Uses `svelte/animate` for transitions (e.g., flip, fade) on state changes or interactions.

## SetSelector (Updated from LanguageSelector)

**Responsibility:** Allows user to select the alphabet/letter set to study (Arabic, Russian, Ottoman, Persian).

**Dependencies:** Alphabet definitions, UI Text Constants
