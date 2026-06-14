import { Metadata } from "next"

const title = "Quranku"
const description =
  "Baca Al-Quran dengan ayat terjemahan Bahasa Indonesia"

export const sharedMetadata: Metadata = {
  metadataBase: new URL("https://quranku.my.id"),
  keywords: "Al-Quran, Quran, Quran Indonesia, Quranku",
  title: {
    default: `${title}`,
    template: `%s`,
  },
  openGraph: {
    locale: 'id_ID',
    type: "website",
    title: `${title}`,
    description: `${description}`,
    siteName: `Quranku`,
    images: [
      {
        url: `/images/cover-quranku.jpg`,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `@quranku`,
    creator: "@quranku",
    images: `/images/cover-quranku.jpg`,
  },
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  description: `${description}`,
  authors: [{ name: "Quranku", url: "https://quranku.my.id" }],
}
