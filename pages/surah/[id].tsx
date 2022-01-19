import Image from 'next/image'
import Header from '@/components/layout/Header'
import Verse from '@/components/Verse'

export default function SurahPage({surah}: any) {
  const isSpecial = (parseInt(surah.number) !== 1 && parseInt(surah.number) !== 9)
  
  return (
    <>
      <Header isFixed={true} isBack={true} title={surah.name_latin} />
      <div className="flex flex-col items-center justify-center px-[20px]">
        
        <style jsx>{`
          .bg-detailsurah {
            background: linear-gradient(135deg, #29A19C 0%, #5EC4BF 100%);
            border-radius: 8px;
          }
        `}</style>
        <div className='relative w-full mb-6 mt-[68px]'>
          <div className="bg-detailsurah pt-4 pb-3">
            <div className='text-center align-middle'>
              <div className='font-bold text-xl mb-[3px] text-white'>
                {surah.name_latin}
              </div>
              <div className='text-xs text-white mb-[10px]'>{surah.translations.id.name}</div>
              {isSpecial &&
                <>
                  <hr className='w-[220px] mx-auto mb-3' />
                  <Image 
                    className='rounded-lg w-full'
                    src='/images/bismillah.svg'
                    width={142}
                    height={32}
                    alt=''
                  />
                </>
              } 
            </div>
          </div>
        </div>
        <div className='flex flex-col relative'>
          <Verse
            verse={surah.text}
            translations={surah.translations}
          />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await import('@/api/surah-info.json')

  return { 
    paths: res.surah_info.map((item: any) => ({
      params: { 
        id: item.index.toString()
      }
    })), 
    fallback: false 
  }
}


export async function getStaticProps({ params }: any) {
  const res = await import(`@/api/surah/${params.id}.json`)
  const surah = res[params.id]
  const countAyah = parseInt(surah.number_of_ayah)
  return {
    props: {
      surah,
      countAyah
    },
  }
}