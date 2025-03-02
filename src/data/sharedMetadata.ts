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
        url: `/images/icon/cover-quranku.jpg`,
      },
    ],
  },
  icons: [
    { rel: "icon", url: "/favicon.svg" },
  ],
  twitter: {
    card: "summary_large_image",
    site: `@quranku`,
    creator: "@quranku",
    images: `/images/icon/cover-quranku.jpg`,
  },
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  description: `${description}`,
  authors: [{ name: "Quranku", url: "https://quranku.my.id" }],
}
