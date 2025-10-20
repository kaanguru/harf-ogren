# US007: Update Application Routes to Use SetId Parameter

## User Story
As a user of Harf Öğren, I want the application routes to use a generic `setId` parameter instead of `language`, so that all character sets are handled uniformly in the URL structure.

## Acceptance Criteria
- Existing routes like `/learn/[language]` should be updated to `/learn/[setId]`
- Existing routes like `/quiz/[language]` should be updated to `/quiz/[setId]`
- All route parameters should accept 'ar', 'ru', 'ot', and 'fa' values
- The route handling logic should work identically for all character sets
- All navigation between pages should use the new parameter structure

## Technical Requirements
- Rename route parameter from `[language]` to `[setId]` in SvelteKit routing
- Update route validation to accept new set IDs ('ot', 'fa')
- Update all navigation functions to use the new parameter
- Ensure proper error handling for invalid set IDs
- Update any route-specific logic to work with setId parameter

## Implementation Notes
- SvelteKit uses file-based routing, so this will require renaming route directories
- Need to update the learn/[language]/+page.svelte to learn/[setId]/+page.svelte
- Need to update the quiz/[language]/+page.svelte to quiz/[setId]/+page.svelte
- Route validation logic must be updated to accept the new set IDs
- Need to ensure that navigation functions handle the new parameter correctly

## Testing
- Verify that all routes work with the new setId parameter
- Test navigation between home page and learn pages
- Confirm that invalid set IDs are handled properly
- Ensure quiz mode routes work correctly with the new parameter