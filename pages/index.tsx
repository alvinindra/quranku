import Image from 'next/image'
import Header from '@/components/layout/Header'
import ListSurah from '@/components/ListSurah'
import { getItem } from '@/utils/storage'
import storageKey from '@/constant/storage-key'
import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import type { SurahInfo, SurahInfoJson } from '@/types/SurahInfo'

export default function Home({surah_info}: SurahInfoJson) {
  const [showButton, setShowButton] = useState(false)
  const cacheLastRead = getItem(storageKey.LAST_READ, storageKey.VERSION) || {}
  const hasCache = Object.keys(cacheLastRead).length > 0

  const gotoLastRead = () => {
    if (hasCache) {
      Router.push(`/surah/${cacheLastRead.numberSurah}#${cacheLastRead.verse}`)
    } else {
      return
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Baca Al-Quran dengan ayat terjemahan Bahasa Indonesia" />
        <meta name="keywords" content="Al-Quran, Quran, Quran Indonesia, Quranku" />
        <meta name="og:title" content="Quranku" />
        <title>Quranku</title>
      </Head>
      <Header title='Quranku'/>

      <main className="px-[20px] w-full">
        <div className={`relative ${hasCache ? 'cursor-pointer' : ''}`} onClick={() => gotoLastRead()}>
          <div className='absolute z-10 left-5 top-5'>
            <div className='flex mb-6'>
              <Image 
                className='rounded-lg w-full'
                src='/images/icon/lastread.svg'
                width={20}
                height={20}
                alt=''
              />
              <div className='text-sm ml-2 text-white'>Terakhir Dibaca</div>
            </div>
            { hasCache ?
              <>
                <div className='font-bold text-base mb-[3px] text-white'>
                  {cacheLastRead.surah}
                </div>
                <div className='text-xs text-white'>Ayat {cacheLastRead.verse}</div>
              </>
              : <>
                <div className='font-bold text-base mb-[3px] text-white'>
                  <div>Ayo baca </div>
                  <div>Al-Quran</div>
                </div>
              </>
            }
          </div>
          <Image 
            className='rounded-lg w-full'
            src='/images/bg-lastread.svg'
            width={320}
            height={130}
            layout='responsive'
            objectFit='cover'
            priority
            alt=''
          />
        </div>
        <ListSurah surah_info={surah_info} />
      </main>
      {showButton && (
        <button onClick={scrollToTop} className="fixed p-3 rounded-full bottom-5 right-5 text-lg bg-[#29A19C] drop-shadow-custom">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 11H11V21H13V11H16L12 7L8 11ZM4 3V5H20V3H4Z" fill="white"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const res = await import('@/data/surah-info.json')
  const surah_info = res.surah_info.map((item: SurahInfo) => {
    return Object.assign({}, item, { index: item.index })
  })

  return {
    props: {
      surah_info,
    },
  }
}