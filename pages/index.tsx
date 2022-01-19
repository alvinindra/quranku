import Image from 'next/image'
import Header from '@/components/layout/Header'
import ListSurah from '@/components/ListSurah'

export default function Home({listFullSurah}: any) {
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
            <div className='font-bold text-base mb-[3px] text-white'>
              Al-Fatihah
            </div>
            <div className='text-xs text-white'>Ayat 1</div>
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
  const res = await import('../api/surah-info.json')
  const listFullSurah = res.surah_info.map((item: any) => {
    return Object.assign({}, item, { index: item.index })
  })

  return {
    props: {
      listFullSurah,
    },
  }
}