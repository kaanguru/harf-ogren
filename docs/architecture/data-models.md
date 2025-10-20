# Data Models

_(`alphabet-definition.ts` ve `user-progress.ts` dosyalarındaki yapılar referans alınmıştır)_

## AlphabetSet (Updated Concept)

**Purpose:** Defines a collection of letters for learning (Arabic, Russian, Ottoman-specific, Persian-specific).

**Key Attributes:**

- `id`: string - Unique identifier (e.g., 'ar', 'ru', 'ot', 'fa')
- `name`: string - Display name (e.g., 'Arapça', 'Rusça', 'Osmanlıca Harfler')
- `letters`: Letter[] - Array of letters in the set

## Letter

**Purpose:** Represents a single learnable letter.

**Key Attributes:**

- `id`: string - Unique identifier within the set (e.g., 'alif', 'pe')
- `symbol`: string - The character symbol (e.g., 'ا', 'پ')
- `name`: string - Turkish name/description (e.g., 'Elif', 'Pe')
- `pronunciation?`: string - Turkish pronunciation description

## UserProgress

**Purpose:** Tracks basic user learning progress per set. Matches `user-progress.ts` structure.

**Key Attributes:**

- `setId`: string - Target alphabet/set ID ('ar', 'ru', 'ot', 'fa') (Update needed in `user-progress.ts`)
- `learnedLetters`: string[] - Array of learned letter IDs within the set
- `lastActive`: string - ISO string timestamp of last activity

**Storage:** **`localStorage`** (likely using a key per set, e.g., `progress_ar`, `progress_ot`)
