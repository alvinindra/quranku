import Image from 'next/image'
import Header from '@/components/layout/Header'
import ListSurah from '@/components/ListSurah'
import { getItem } from '@/utils/storage'
import storageKey from '@/constant/storage-key'
import Head from 'next/head'
import Link from 'next/link'

export default function Home({listFullSurah}: any) {
  const cacheLastRead = getItem(storageKey.LAST_READ, storageKey.VERSION) || {}
  const hasCache = Object.keys(cacheLastRead).length > 0
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>Quranku</title>
      </Head>
      <Header title='Quranku'/>

      <main className="px-[20px] w-full">
        <Link
            href={`/surah/${cacheLastRead.numberSurah}#${cacheLastRead.verse}`}
            passHref
          >
          <div className='relative cursor-pointer'>
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
        </Link>
        <ListSurah listFullSurah={listFullSurah} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await import('@/data/surah-info.json')
  const listFullSurah = res.surah_info.map((item: any) => {
    return Object.assign({}, item, { index: item.index })
  })

  return {
    props: {
      listFullSurah,
    },
  }
}