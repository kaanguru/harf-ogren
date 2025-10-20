# US010: Update Quiz Mode for Multiple Sets

## User Story
As a user of Harf Öğren, I want the quiz functionality to work with all character sets (Arabic, Russian, Ottoman Turkish, Persian), so that I can test my knowledge of any set I'm studying with the same effective quiz experience.

## Acceptance Criteria
- The `QuizService` should generate questions correctly for all character sets
- The quiz interface should work properly with letters from any set
- Question validation should work accurately for all sets
- Difficulty levels (easy, medium, hard) should work consistently across all sets
- Audio playback for quiz questions should work correctly for all character sets

## Technical Requirements
- Update QuizService to accept and work with setId parameter instead of language
- Ensure question generation works properly for all character set sizes
- Maintain consistent quiz logic and difficulty algorithms
- Keep the same user experience across all sets
- Update any UI components that reference language instead of setId

## Implementation Notes
- QuizService currently uses language parameter, needs to be updated to setId
- Question generation logic should scale appropriately for different set sizes
- May need adjustments for sets with different numbers of letters
- Audio playback functionality should work seamlessly with new sets
- Difficulty levels should adapt to the size of each character set

## Testing
- Verify that quiz questions are generated correctly for each set
- Test all difficulty levels work properly with all character sets
- Confirm that answer validation works accurately
- Ensure audio playback functions correctly in quiz mode for all sets
- Validate that quiz experience is consistent across all character sets