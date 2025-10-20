# Implementation Priority

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
