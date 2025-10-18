# Publishing Harf Öğren to F-Droid

This guide will help you package your PWA for the F-Droid repository using Bubblewrap.

## Prerequisites

1. **F-Droid Account** (free)
2. **Node.js and npm/pnpm** installed on your machine
3. **Android Studio** (for building and testing)
4. **JDK 8 or higher**
5. **GitHub repository** for your app (since F-Droid builds from source)

## Step 1: Create F-Droid Repository Entry

F-Droid requires you to submit a metadata file to be included in the repository. You have two options:

### Option A: Official F-Droid Repository

- Fork the [fdroiddata](https://gitlab.com/fdroid/fdroiddata) repository
- Create a metadata file in `metadata/com.yourdomain.harfogren.yml`
- Submit a merge request following their contribution guidelines

### Option B: F-Droid Priv repo (Personal Repository)

- If your app doesn't meet official repo criteria, you can create your own F-Droid repository
- Use the F-Droid server tools to maintain your own repository

## Step 2: Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
# or if using pnpm
pnpm add -g @bubblewrap/cli
```

## Step 3: Create Bubblewrap Configuration

Run the following command in your project root:

```bash
bubblewrap init --manifest=https://harf-ogren.netlify.app/manifest.json
```

This will use your live manifest from your Netlify deployment.

This will create a `twa-manifest.json` file with the PWA configuration.

## Step 4: Update Bubblewrap Configuration

You may need to update the `twa-manifest.json` file to match your app:

- Update the `packageId` to something like `com.kaanguru.harfogren`
- Update the `appVersionName` and `appVersionCode`
- Ensure the `name`, `shortName`, and `description` match your needs
- Update icon URLs to point to your hosted icons

## Step 5: Build the APK

```bash
bubblewrap build
```

This will create an `app-release-bundle.aab` file in the `build/` directory. For F-Droid, you'll need to extract the APK from this bundle or build directly to APK:

```bash
# If you need APK instead of AAB
bubblewrap build --skipPwaValidation
```

## Step 6: Prepare Metadata for F-Droid

Create a metadata file in the format F-Droid expects. For the official repository, this would be a YAML file:

```yaml
Categories:
  - Education
  - Kids
License: [Your-License-Here]  # Replace with your actual license (e.g., MIT, GPL-3.0, etc.)
AuthorName: Kaan Guru
AuthorEmail: [your-email@example.com]  # Replace with your actual email
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
    subdir: android # Assuming you'll create an android directory for the Bubblewrap project
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

## Step 7: Create a GitHub Release

1. Create a new release of your web app on GitHub
2. Tag it with a version number (e.g., v1.0.0)
3. Include your built APK file as an asset if required

## Step 8: Submit to F-Droid

### For Official F-Droid:

1. Fork the [fdroiddata](https://gitlab.com/fdroid/fdroiddata) repository
2. Add your metadata file in the `metadata` directory
3. Submit a merge request with your changes
4. Follow the review process (this can take time)

### For F-Droid Priv:

1. Set up your own F-Droid repository server
2. Add your app metadata
3. Users will need to add your repository URL to their F-Droid client

## Publishing Requirements for F-Droid

Make sure to have these ready before publishing:

- Privacy Policy (we created PRIVACY_POLICY.md and privacy.html)
- Terms of Service (we created TERMS_OF_SERVICE.md and terms.html)
- Open source repository with license
- All assets and metadata in proper formats

## Additional Notes

- F-Droid prioritizes Free and Open Source Software
- Your app should follow F-Droid's inclusion policy
- All code and assets must be open source
- F-Droid builds apps from source automatically
- Your PWA needs to meet F-Droid's quality criteria
- It should work on mobile devices
- It should have a valid manifest.json and service worker

## Updates

To update your app in the future:

1. Update your PWA
2. Tag a new version in your Git repository
3. Update the metadata file with new version information
4. Submit updates to the F-Droid data repository

## Troubleshooting

- If your app is rejected, check that it meets F-Droid inclusion criteria
- Ensure all dependencies are FOSS
- Make sure your source code is properly licensed
- Verify that your app works offline (at least basic functionality)

For more information, see the official [F-Droid documentation](https://f-droid.org/en/docs/) and [build server documentation](https://f-droid.org/en/docs/Build_Server_Setup/).

F-Droid is particularly suitable for your educational app since it's free, open source, and focuses on educational content.
