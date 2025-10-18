# Installing Svelte DevTools for Harf Öğren

## Browser Extension (Recommended)

For SvelteKit applications, Svelte DevTools is best installed as a browser extension:

1. **Chrome/Edge**: Install from the Chrome Web Store
   - Search for "Svelte DevTools" in the Chrome Web Store
   - Install the official extension by Svelte Labs

2. **Firefox**: Install from AMO (Add-ons site)
   - Search for "Svelte DevTools" in Firefox Add-ons
   - Install the official extension

3. **Safari**: Check the Safari Extensions Gallery or use the Web Inspector

## Manual Installation (Alternative)

If you want to install it programmatically, you can add it to your project as a dev dependency for development/tools:

```bash
# Install the Chrome extension package (using pnpm)
pnpm add -D @sveltejs/svelte-devtools
```

## Using Svelte DevTools

Once installed as a browser extension:

1. Open your application in the browser (e.g., http://localhost:5173)
2. Open DevTools (F12 or right-click → Inspect)
3. Look for the Svelte tab in the DevTools sidebar
4. This will show:
   - Component hierarchy
   - Component props and state
   - Event handling
   - Reactive variable tracking

## Installation Check

To verify Svelte DevTools is working:

1. Open your application in the browser
2. In DevTools, you should see a new "Svelte" panel
3. The panel should show your components and reactive state

## Known Considerations for SvelteKit

Since this is a SvelteKit app:

- Make sure to run the development server with `npm run dev` or `pnpm dev`
- Svelte DevTools works with the development build (not production)
- It helps you debug reactivity, prop passing, and component structure

Note: Svelte DevTools requires no code changes to your application - it works automatically with the Svelte compiler in development mode.
