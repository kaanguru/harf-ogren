# US004: Update Progress Store for Multiple Sets

## User Story
As a user of Harf Öğren, I want the application to properly manage my progress across different character sets using Svelte stores, so that the UI consistently reflects my learning status regardless of which set I'm studying.

## Acceptance Criteria
- The `progress.store.ts` should be updated to work with the new setId terminology instead of language
- The store should properly subscribe to progress data based on the currently selected set
- All exported functions (markLetterLearned, resetProgress, setLanguage, getLearnedLetters, isLetterLearned) should use setId parameter
- The currentLanguage store should be renamed to currentSet or similar to reflect its broader purpose
- The UI components that depend on these stores should continue to work correctly

## Technical Requirements
- Rename `currentLanguage` store to `currentSet` or similar
- Update all store subscriptions to work with setId parameter
- Update all store functions to use setId instead of language
- Maintain the same reactive behavior and functionality
- Update any components that directly reference the store

## Implementation Notes
- This store serves as the main interface between UI components and the progress tracking service
- The store needs to maintain the same reactive behavior while working with the new setId structure
- Need to ensure that store subscriptions properly handle set switching
- Should consider backward compatibility during transition

## Testing
- Verify that the store properly updates when switching between different sets
- Test that markLetterLearned function works correctly with new setId parameter
- Confirm that progress updates are properly reflected in UI components
- Ensure that store functions return correct data for the selected set