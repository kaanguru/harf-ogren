# US001: Extend Alphabet Definitions with Ottoman and Persian Letters

## User Story

As a user of Harf Öğren, I want to be able to learn Ottoman Turkish and Persian-specific letters in addition to Arabic and Russian, so that I can expand my knowledge of related scripts and languages.

## Acceptance Criteria

- The application should support Ottoman Turkish-specific letter set with accurate symbols, names, and pronunciation guides
- The application should support Persian-specific letter set with accurate symbols, names, and pronunciation guides
- The alphabet definition model should be extended to include 'ot' (Ottoman Turkish) and 'fa' (Persian) as valid set IDs
- The audio file mapping should be updated to include appropriate audio file names for all new letters
- The alphabet definition functions should work correctly with the new sets (getAlphabet, getLetter, getTotalLetters, getAudioFileName)

## Technical Requirements

- Update `Alphabet` interface to allow 'ot' | 'fa' as additional valid IDs
- Add complete letter definitions for Ottoman Turkish (ot) and Persian (fa) sets
- Update `getAudioFileName` function to include mappings for new letters
- Implement proper pronunciation guides for Turkish users
- Ensure all existing functionality continues to work unchanged

## Implementation Notes

- Ottoman Turkish includes 32 letters: pe, che, je, she, qaf, kaf, lam, mim, nun, vav, he, alef, beh, teh, theh, jeem, hah, khah, dal, dhal, re, zain, seen, sheen, sad, dad, tah, zah, ain, ghain, fe, and qaf
- Persian includes 32 letters: alef, beh, pe, te, se, jim, che, he, khe, dal, zal, re, ze, jeh, sin, shin, sad, zad, ta, za, ein, ghain, fe, qaf, kaf, gaf, lam, mim, nun, vav, he, and ye
- Use appropriate numeric prefixes for audio files similar to existing patterns
- Ensure all letters have proper Turkish names/descriptions

## Osmanlıca'ya Özgü Harfler

Osmanlıca, Farsça alfabesini temel alarak **3 ek harf** eklemiştir:

1. **ڭ (nef/sağır kef)** - Türkçe'deki yumuşak "ñ/ng" sesi için (örn: dağ, yengeç)
2. **ڤ (vav-ı Rumî)** - "v" sesi için (örn: vatan, Avrupa)
3. **ݒ veya گ (kef-i Farisi)** - Bazı lehçelerde kullanılan yumuşak "g" için

## Ortak Harfler (Farsça'dan Alınan)

Her iki alfabede de bulunan Farsça kökenli harfler:

- **پ (pe)** - "p" sesi
- **چ (çe)** - "ç" sesi
- **ژ (je)** - "j" sesi (Fransızca journal'daki gibi)

## Testing

- Verify that all letters in both new sets are properly defined
- Test that audio file mappings exist for all new letters
- Ensure that getAlphabet, getLetter, and getTotalLetters functions work correctly for new sets
- Confirm that existing Arabic and Russian sets remain unchanged
