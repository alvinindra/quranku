import Image from 'next/image'
import Header from '@/components/layout/Header'
import ListSurah from '@/components/ListSurah'
import { getItem } from '@/utils/storage'
import storageKey from '@/constant/storage-key'

export default function Home({listFullSurah}: any) {
  const cacheLastRead = getItem(storageKey.LAST_READ, storageKey.VERSION) || {}
  return (
    <div className="flex flex-col items-center justify-center">
      <Header title='Quranku'/>

      <main className="px-[20px] w-full">
        <div className='relative'>
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
            { Object.keys(cacheLastRead).length > 0 ?
              <>
                <div className='font-bold text-base mb-[3px] text-white'>
                  {cacheLastRead.surah}
                </div>
                <div className='text-xs text-white'>Ayat {cacheLastRead.verse}</div>
              </>
              : <div className='font-bold text-base mb-[3px] text-white w-[100px]'>
                Ayo baca Al-Quran
              </div>
            }
          </div>
          <Image 
            className='rounded-lg w-full'
            src='/images/bg-lastread.svg'
            width={320}
            height={130}
            layout='responsive'
            objectFit='cover'
            alt=''
          />
        </div>
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