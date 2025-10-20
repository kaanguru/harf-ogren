# Source Tree

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
