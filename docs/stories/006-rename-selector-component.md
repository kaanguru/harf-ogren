# US006: Rename Language Selector to Set Selector Component

## User Story
As a user of Harf Öğren, I want the application interface to clearly indicate that I'm selecting character sets rather than just languages, so that I understand I can learn multiple different scripts regardless of their native language.

## Acceptance Criteria
- The `LanguageSelector.svelte` component should be renamed to `SetSelector.svelte`
- The component should dynamically display all available character sets (Arabic, Russian, Ottoman Turkish, Persian)
- The component should properly navigate to routes using the new setId parameter instead of language
- All functionality should remain the same, just with updated terminology and expanded options
- The UI should be visually consistent with the rest of the application

## Technical Requirements
- Rename the component file from `LanguageSelector.svelte` to `SetSelector.svelte`
- Update the component logic to work with multiple sets instead of just languages
- Replace hardcoded language options with dynamic options from alphabet definitions
- Update navigation links to use `setId` parameter in routes
- Update any imports to reference the new component name

## Implementation Notes
- This component serves as the main entry point for selecting which set to study
- Should dynamically iterate through all available alphabets defined in alphabet-definition.ts
- Need to update the home page to import the new component name
- The component should maintain its current visual design and behavior

## Testing
- Verify that all character sets are displayed as options
- Test navigation to each set's learning page
- Confirm that the component renders properly with dynamic content
- Ensure all existing functionality remains intact