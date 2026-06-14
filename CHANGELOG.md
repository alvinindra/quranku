# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.3] - 2026-06-14

### Fixed
- **Audio play icon** now uses full-strength accent color (matching the bookmark icon) instead of a dim low-contrast variant — visible in both light and dark mode.
- **Dark/light theme switching** now transitions smoothly (eased color transition) instead of snapping.

## [3.1.2] - 2026-06-14

### Added
- **Apple touch icon** (180×180) and an Android **maskable** icon; completed the PWA manifest icon set (absolute paths, `purpose` fields, `description`) and wired icons through metadata.

### Fixed
- Home **"Terakhir Dibaca"** label now appears only when a last read exists; the hero card stays visible with an "Ayo baca Al-Quran" fallback otherwise.
- Corrected `icon-384x384.png`, which was actually 284×284.

## [3.1.1] - 2026-06-13

### Fixed
- **Qibla compass** — only use reliable headings (iOS `webkitCompassHeading` or absolute device orientation), ignore misleading relative readings, and show a clear message when the device has no compass sensor instead of leaving a silent, inactive arrow. The static qibla bearing still works as a fallback.

## [3.1.0] - 2026-06-13

### Added
- Per-ayah **tafsir** (Kemenag), toggleable from settings.
- **Surah context** ("Tentang Surah") — per-surah opening/closing notes.
- **Reading settings sheet** (right-slide, in the header): theme (light/dark), Arabic font size, and visibility toggles for translation, tafsir, and surah context.
- **Bookmark collections** with a management page at `/bookmarks`.
- **Resume reading** — jump to the last-read ayah, plus a last-read marker in the surah list.
- **Juz navigation** at `/juz` (all 30 juz).
- **Prayer times & Hijri date** at `/jadwal-sholat` — computed locally with `adhan`, geolocation with a city fallback.
- **Qibla compass** at `/qibla` (device orientation, great-circle bearing to the Kaaba).
- **Per-ayah audio recitation** (Mishary Alafasy via the everyayah CDN).
- **Vitest** test suite for the storage and bookmark utilities.

### Changed
- Consolidated configuration into a single **settings sheet** in the header, replacing the standalone dark-mode toggle; dark/light now lives inside settings.
- Distinct, content-appropriate **icons** for the homepage menu.
- The "Terakhir Dibaca" home card now appears **only when a last read exists**.

### Fixed
- Anchored ayah scrolling now accounts for the fixed header, so juz/bookmark/resume deep-links land on the correct verse.
- Bookmark icon now shows a **filled** state when an ayah is saved.

## [3.0.0]

### Changed
- Migrated tooling to **Bun**, upgraded to **Next.js 16** / **React 19**, ESLint 9 flat config, and Node LTS (`>=24.15.0`).

[3.1.3]: https://github.com/alvinindra/quranku/compare/v3.1.2...v3.1.3
[3.1.2]: https://github.com/alvinindra/quranku/compare/v3.1.1...v3.1.2
[3.1.1]: https://github.com/alvinindra/quranku/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/alvinindra/quranku/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/alvinindra/quranku/releases/tag/v3.0.0
