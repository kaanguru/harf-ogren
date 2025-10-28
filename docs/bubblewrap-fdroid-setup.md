# Converting Harf Öğren PWA to Android App for F-Droid

This guide documents the complete process to package the Harf Öğren PWA as an Android app for submission to the F-Droid repository.

## Overview

This document outlines the steps to create an Android wrapper for the Harf Öğren web application using Bubblewrap, allowing users to install and use the PWA as a native Android application through app stores like F-Droid.

## Prerequisites

1. **F-Droid Account** (free)
2. **Node.js and npm/pnpm** installed on your machine
3. **JDK 8 or higher** (will be installed by Bubblewrap if not present)
4. **GitHub repository** for your app (since F-Droid builds from source)
5. **Bubblewrap CLI** installed globally (setup covered below)

## Step 1: Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
# or if using pnpm
pnpm add -g @bubblewrap/cli
```

## Step 2: Create Bubblewrap Configuration

We created a `twa-manifest.json` file with the following configuration:

```json
{
  "packageId": "com.kaanguru.harfogren",
  "host": "harf-ogren.netlify.app",
  "name": "Harf Öğren",
  "shortName": "Harf Öğren",
  "startUrl": "/",
  "minSdkVersion": 19,
  "launcherName": "Harf Öğren",
  "themeColor": "#3b82f6",
  "navigationColor": "#3b82f6",
  "navigationColorDark": "#3b82f6",
  "navigationDividerColor": "#3b82f6",
  "navigationDividerColorDark": "#3b82f6",
  "iconUrl": "https://harf-ogren.netlify.app/pwa-512x512.png",
  "maskableIconUrl": "https://harf-ogren.netlify.app/maskable-icon-512x512.png",
  "monochromeIconUrl": "",
  "splashScreenFadeOutDuration": 300,
  "versionName": "1.0.0",
  "versionCode": 1,
  "signingKey": {
    "path": "android.keystore",
    "alias": "my-key-alias"
  },
  "appType": "twa",
  "postMessage": true,
  "features": {
    "locationDelegation": {
      "enabled": true
    },
    "playBilling": {
      "enabled": false
    }
  },
  "enableSiteSettingsShortcut": true,
  "isChromeOSOnly": false,
  "isMetaQuest": false,
  "id": "com.kaanguru.harfogren",
  "fallbackStrategy": "customtabs",
  "preferRelatedApplications": false,
  "relatedApplications": [],
  "alphaDependencies": {
    "enabled": false
  },
  "enableNotifications": true,
  "noLaunchUrl": false,
  "webManifestUrl": "https://harf-ogren.netlify.app/manifest.json"
}
```

## Step 3: Build the APK

To build the APK, run the following command in your terminal:

```bash
bubblewrap build --skipPwaValidation
```

When prompted during the build process:
1. Type `Y` when asked "Do you want Bubblewrap to install the Android SDK (recommended)?"
2. Type `y` when asked to agree to the Android SDK terms and conditions
3. If asked for a "versionName for the new App version", enter `1.0.0` (or the next version number you want to use)
4. If prompted for a keystore password, you'll need to set one up (see detailed steps below)

The build process will:
- Download and install the Android SDK (if not already installed)
- Generate the necessary Android project files
- Build the APK file in the `build/` directory

Note: If Bubblewrap detects that you're updating an existing project, it may ask for a new versionName. The current configuration in your `twa-manifest.json` already has versionName set to "1.0.0", so you can confirm this version or increment it as needed (e.g., "1.0.1", "1.1.0", etc.).

## Keystore Password Setup

If you encounter a prompt for a keystore password during the build process:

1. **Create a new keystore** (if the placeholder doesn't work):
   ```bash
   keytool -genkey -v -keystore android.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **When prompted for passwords during keytool creation**:
   - Enter a secure keystore password (remember this for future builds)
   - Confirm the password
   - Enter the same password for the key password (or create a separate one if preferred)
   - Answer the questions about your organization (you can use placeholders if needed)

3. **If prompted during the build process**:
   - Enter the same password you created for the keystore
   - If you used the same password for the key, enter it again

## Step 4: F-Droid Metadata File

We created an F-Droid metadata file `com.kaanguru.harfogren.yml`:

```yaml
Categories:
  - Education
  - Kids
License: MIT
AuthorName: Kaan Guru
AuthorEmail: kaangurudev@gmail.com
WebSite: https://harf-ogren.netlify.app
SourceCode: https://github.com/kaanguru/harf-ogren
IssueTracker: https://github.com/kaanguru/harf-ogren/issues
Changelog: https://github.com/kaanguru/harf-ogren/releases

AutoName: Harf Öğren
Summary: Learn Arabic & Russian Alphabets
Description: |-
  Learn Arabic and Russian alphabets through interactive lessons and quizzes.
  .
  Features:
  * Interactive lessons for Arabic and Russian alphabets
  * Audio pronunciation for each letter
  * Visual learning with interactive letter grids
  * Progress tracking to monitor your learning journey
  * Offline capability - learn anywhere without internet
  * Mobile-optimized design for the best learning experience
  * Free and open-source educational tool

RepoType: git
Repo: https://github.com/kaanguru/harf-ogren.git

Builds:
  - versionName: '1.0.0'
    versionCode: 1
    commit: v1.0.0
    subdir: android
    gradle:
      - yes
    prebuild:
      - npm install -g @bubblewrap/cli
      - bubblewrap update
    scandelete:
      - build

AutoUpdateMode: Version
UpdateCheckMode: Tags
CurrentVersion: 1.0.0
CurrentVersionCode: 1
```

## Step 5: Submit to Your F-Droid Fork

To submit your app to F-Droid via your fork at https://gitlab.com/kaanguru/fdroiddata-fork:

1. Add the `com.kaanguru.harfogren.yml` file to your F-Droid fork in the `metadata/` directory
2. Create a merge request following F-Droid's contribution guidelines
3. Make sure your GitHub repository has a proper release tag that matches the version in the metadata

## Step 6: Update Digital Asset Links (For Other App Stores)

If you plan to distribute on Google Play Store as well, you'll need to update the `assetlinks.json` file with your actual certificate fingerprints. For F-Droid, this is typically handled by F-Droid since they manage their own signing process.

## Important Note: F-Droid Signing

F-Droid has its own build system and signing process. This means:

- The keystore and passwords you set up are primarily for local testing and development
- F-Droid will rebuild your app from source and use its own signing keys
- The signing information in your `twa-manifest.json` and keystore is not used by F-Droid itself
- Your app will still work properly since F-Droid builds from the source code following the build instructions in your metadata file

## Additional Notes

- F-Droid prioritizes Free and Open Source Software
- Make sure all assets and code comply with open-source licenses
- Your app should follow F-Droid's inclusion policy
- All code and assets must be open source

## Troubleshooting

- If your app is rejected, check that it meets F-Droid inclusion criteria
- Ensure all dependencies are FOSS-compatible
- Make sure your source code is properly licensed
- Verify that your app works offline with at least basic functionality

## Updates Process

To update your app in the future:

1. Update your PWA
2. Increment the version in your `twa-manifest.json`:
   - Update `versionName` (e.g., from "1.0.0" to "1.0.1")
   - Update `versionCode` (increment by 1 each time, e.g., from 1 to 2)
3. Tag a new version in your Git repository
4. Build the new APK: `bubblewrap build --skipPwaValidation`
5. Update the metadata file with new version information if needed
6. Submit updates to your F-Droid fork repository

## References

- [Official F-Droid documentation](https://f-droid.org/en/docs/)
- [Build Server Setup](https://f-droid.org/en/docs/Build_Server_Setup/)
- [Bubblewrap documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [PWA to Android guide](https://web.dev/using-bubblewrap-for-android-apps/)