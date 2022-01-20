import Image from 'next/image'
import storageKey from '@/constant/storage-key'
import { setItem } from '@/utils/storage'

const setLastReadVerse = (surah: any, verse: any) => {
  const data: any = { surah, verse }
  setItem(storageKey.LAST_READ, data, storageKey.VERSION)
}

export default function Verse({surah, verse, translations}: any) {
  return (
    <>
      {
        Object.keys(verse).map((text: any, index: number) => {
          return <div key={index} className='relative flex flex-col mb-5 px-3 py-4 bg-white rounded-lg drop-shadow-custom'>
            <div className='flex mb-2'>
              <div className='flex-shrink-0 mr-5 my-auto rounded-full w-6 h-6 text-center border border-[#29A19C] 
              text-xs text-[#29A19C] flex justify-center'>
                <span className='my-auto'>{index+1}</span>
              </div>
              <button className='ml-auto' onClick={() => setLastReadVerse(surah, index+1)}>
                <Image 
                  src='/images/icon/bookmark.svg'
                  width={24}
                  height={24}
                  alt=''
                />
              </button>
            </div>
            <div className='my-auto'>
              <div className='text-[#0C1517] text-lg font-bold arab mb-[6px] leading-[31.64px]'>{verse[text]}</div>
              <div className='text-[#8A8A8E] text-xs leading-[18px]'>{translations.id.text[text]}</div>
            </div>
          </div>
        })
      }
    </>
  );
}