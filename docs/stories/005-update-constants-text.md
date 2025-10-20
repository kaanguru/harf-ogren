# US005: Update Constants with New Set Text

## User Story
As a Turkish-speaking user of Harf Öğren, I want to see proper Turkish labels and descriptions for Ottoman Turkish and Persian character sets, so that I can clearly identify and select these options in the application.

## Acceptance Criteria
- The `UI_TEXT` constants should include Turkish names for Ottoman Turkish ('Osmanlıca Harfler') and Persian ('Farsça Harfler') sets
- All relevant UI text elements should be updated to support the new sets
- The updated constants should follow the same pattern as existing Arabic and Russian labels
- The application UI should properly display the new set names in all relevant locations

## Technical Requirements
- Add new constants for Ottoman Turkish and Persian in Turkish
- Update the UI_TEXT object to include the new set names
- Ensure all text follows Turkish grammar and proper naming conventions
- Update any other related UI text that might be needed

## Implementation Notes
- The UI currently uses terms like 'Arapça' and 'Rusça', need to add 'Osmanlıca' and 'Farsça'
- Should maintain consistency with existing naming patterns
- Need to consider if additional UI text is needed for the new sets
- May need to update instructions or other descriptive text

## Testing
- Verify that new set names appear correctly in the UI
- Confirm that all UI elements properly display the Turkish text
- Ensure accessibility and proper rendering of special Turkish characters