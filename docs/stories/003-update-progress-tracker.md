# US003: Update Progress Tracker for Multiple Sets

## User Story
As a user of Harf Öğren, I want my progress to be tracked separately for each character set I study, so that I can learn Arabic, Russian, Ottoman Turkish and Persian independently with distinct progress tracking.

## Acceptance Criteria
- The `ProgressTracker` service should store progress data using distinct localStorage keys for each set (e.g., 'progress_ar', 'progress_ot', etc.)
- When a user switches between sets, their progress should load the appropriate data for that specific set
- The service should maintain separate learned letters, last active timestamps, and progress percentages for each set
- All methods in the ProgressTracker should work correctly with the new setId parameter instead of language
- The localStorage structure should be updated to use separate keys per set

## Technical Requirements
- Modify the STORAGE_KEY from a single 'harf-ogren-progress' to dynamic keys like 'progress_${setId}'
- Update all methods in ProgressTracker to accept and use setId parameter
- Implement proper loading and saving logic for multiple sets
- Maintain existing method signatures but with updated parameters
- Update the localStorage interaction to use the new key structure

## Implementation Notes
- Current implementation uses a single localStorage key, needs to be updated to separate keys per set
- Need to consider migration from old single storage to new separate storage structure
- The service should continue to maintain the same in-memory progress state
- Need to ensure proper initialization when switching between sets

## Testing
- Verify that progress is stored separately for each set
- Test switching between sets and confirm proper progress loading
- Validate that marking letters as learned only affects the current set
- Ensure that progress reset works correctly for individual sets
- Confirm that localStorage keys follow the expected pattern