# US008: Integrate Audio Files for Ottoman and Persian Sets

## User Story
As a user of Harf Öğren, I want to hear the correct pronunciation of Ottoman Turkish and Persian letters, so that I can learn the proper sounds and symbols effectively.

## Acceptance Criteria
- Audio files for Ottoman Turkish letters should be available in `static/audio/letters/ot/`
- Audio files for Persian letters should be available in `static/audio/letters/fa/`
- The `AudioService` should correctly play audio for all new letters
- Audio file naming should follow the same convention as existing sets
- Fallback pronunciation should be available for any missing audio files

## Technical Requirements
- Add audio files for all Ottoman Turkish letters in appropriate directory structure
- Add audio files for all Persian letters in appropriate directory structure
- The getAudioFileName mapping should include entries for all new letters
- Audio service should handle the new set IDs ('ot', 'fa') correctly
- Fallback speech synthesis should work in Turkish for new sets

## Implementation Notes
- Audio files should follow the same naming convention as existing Arabic and Russian sets
- Need to ensure proper file format (MP3) and quality for good user experience
- The audio service already has fallback mechanisms that may need updates for new sets
- Should consider creating audio file name mappings for all new letters

## Testing
- Verify that all Ottoman Turkish letters have corresponding audio files
- Verify that all Persian letters have corresponding audio files
- Test that the AudioService can play all new audio files
- Confirm that fallback pronunciation works for new sets
- Ensure audio quality is acceptable for learning purposes