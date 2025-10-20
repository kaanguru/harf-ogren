# Development Guidelines

## Coding Standards

- **Languages:** TypeScript 5.x
- **Styling:** Tailwind CSS ^4.1.14
- **Linting:** ESLint + Prettier with SvelteKit defaults
- **Functional Principles:**
  - Prefer immutability where practical.
  - Minimize side effects in utility functions.
  - Avoid complex class inheritance structures; favor composition.
  - Use declarative approaches (e.g., array methods like `map`, `filter`, `reduce`) over imperative loops (`for`, `while`) where it enhances readability and maintainability.
  - Consider error handling libraries like `NeverThrow` for predictable error flows, especially in services interacting with storage or external APIs (though none currently exist).

## Core Principles

- **Simple Design:** Focus on essential letter learning functionality.
- **Local-First (Simple):** Prioritize data storage and access on the user's device using `localStorage` for resilience and basic offline capability.
- **Extendable:** Allow easy addition of new letter sets in the future.
- **Turkish Language:** All UI text in Turkish, managed via `constants.ts`.
- **Mobile-First:** Responsive design for mobile devices.
- **Offline Capable:** Basic PWA functionality leveraging `localStorage`.
- **Engaging UI:** Utilize subtle animations for better feedback and engagement.
