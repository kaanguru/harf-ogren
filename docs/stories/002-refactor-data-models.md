# US002: Refactor Data Models to Support Multiple Sets

## User Story
As a developer maintaining Harf Öğren, I want to update the data models to use `setId` instead of `language` terminology, so that the application can properly handle multiple character sets beyond just languages.

## Acceptance Criteria
- The `UserProgress` interface should be updated to use `setId` instead of `language` field
- All functions in `user-progress.ts` should be updated to use `setId` parameter instead of `language`
- The `createDefaultProgress`, `isLetterLearned`, and `calculateProgressPercentage` functions should work with the new `setId` parameter
- All existing code that references the old `language` property should be updated to use `setId`
- The refactoring should maintain backward compatibility with existing progress data if possible

## Technical Requirements
- Update `UserProgress` interface with `setId` field that accepts 'ar' | 'ru' | 'ot' | 'fa'
- Update all function signatures to use `setId` instead of `language`
- Update all implementations to use the new field name
- Ensure all existing references to the old field names are properly updated
- Maintain the same functionality while updating terminology

## Implementation Notes
- This is a foundational change that will affect progress tracking throughout the application
- Need to be careful with localStorage keys that might reference the old naming convention
- The change affects progress store, services, and UI components
- Will require updating the ProgressTracker service to handle the new field names

## Testing
- Verify that default progress creation works with new setId field
- Test that progress calculations are accurate with new field names
- Ensure that isLetterLearned function works properly with new parameters
- Confirm that all existing functionality remains intact