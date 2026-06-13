# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[3.1.0]: https://github.com/alvinindra/quranku/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/alvinindra/quranku/releases/tag/v3.0.0
