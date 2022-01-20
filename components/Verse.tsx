import Image from 'next/image'
import storageKey from '@/constant/storage-key'
import { setItem } from '@/utils/storage'
import { useState } from 'react'

export default function Verse({surah, verse, translations}: any) {
  const [isOpen, setIsOpen] = useState(false)
  const setLastReadVerse = (surah: any, verse: any) => {
    const data: any = { surah, verse }
    setItem(storageKey.LAST_READ, data, storageKey.VERSION)
    if (isOpen) { return setIsOpen(true) }
    setIsOpen(true)
    setTimeout(
      () => setIsOpen(false), 
      3000
    )
  }

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
      {
        isOpen && <div className='fixed w-fit left-1/2 -translate-x-1/2 translate-y-1/2 
        bottom-[50px] transition duration-300 text-white bg-[#29A19C] 
        rounded-md px-5 py-4 z-50'>
          <div className="flex items-center space-x-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="font-semibold text-sm">Berhasil menyimpan bacaan</p>
          </div>
        </div>
      }
    </>
  );
}