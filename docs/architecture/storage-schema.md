# Storage Schema

_(Reflects `localStorage` structure using JSON stringification)_

```javascript
// Example localStorage keys and their stringified JSON values

// Key: "progress_ar"
// Value: '{"setId":"ar","learnedLetters":["alif","ba"],"lastActive":"2025-10-20T10:00:00.000Z"}'

// Key: "progress_ot"
// Value: '{"setId":"ot","learnedLetters":["peh"],"lastActive":"2025-10-20T10:05:00.000Z"}'

// Key: "progress_fa"
// Value: '{"setId":"fa","learnedLetters":[],"lastActive":"2025-10-20T10:06:00.000Z"}'

// Key: "progress_ru"
// Value: '{"setId":"ru","learnedLetters":["a","b","v"],"lastActive":"2025-10-20T10:07:00.000Z"}'

// Alphabet definitions remain in code (alphabet-definition.ts)
// const alphabetsData = { ... };
```
