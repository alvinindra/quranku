import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Aplikasi baca Al-Quran dengan ayat terjemahan Bahasa Indonesia"
        />
        <meta
          name="keywords"
          content="Al-Quran, Quran, Quran Indonesia, Quranku"
        />
        <meta name="og:title" content="Quranku" />
        <title>Quranku</title>
        <meta
          name="og:image"
          content="https://alquran-ku.netlify.app/images/cover-quranku.jpg"
        />
        <meta name="twitter:title" content="Quranku" />
        <meta
          name="twitter:description"
          content="Aplikasi baca Al-Quran dengan ayat terjemahan Bahasa Indonesia"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#29A19C" />
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
