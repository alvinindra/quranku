import Image from 'next/image'
import storageKey from '@/constant/storage-key'
import { setItem } from '@/utils/storage'
import { useEffect, useState } from 'react'

export default function Verse({numberSurah, surah, verse, translations}: any) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const setLastReadVerse = (numberSurah: any, surah: any, verse: any) => {
    const data: any = { numberSurah, surah, verse }
    setItem(storageKey.LAST_READ, data, storageKey.VERSION)
    if (isOpen) { return setIsOpen(true) }
    setIsOpen(true)
  }

  const isOpenFunction = () => {
    if (isOpen) {
      setTimeout(
        () => setIsOpen(false), 
        2000
      )
    }
  }

  useEffect(() => {
    isOpenFunction()
  })

  return (
    <>
      <div className="flex mb-6 drop-shadow-custom">
        <svg className="flex absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
            </path>
        </svg>
        <input type="text" 
          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          onChange={event => setQuery(event.target.value)} 
          className="text-sm text-black rounded-lg appearance-none focus:outline-none focus:shadow-outline 
          pl-8 px-4 py-2 w-full" placeholder="Cari ayat (Contoh : 2)" />
      </div>
      {
        Object.keys(verse).filter((text: any) => {
          if (query === '') {
            return text
          } else if (text.includes(query)) {
            return text
          }
        }).map((text: any, index: any) => (
          <div key={index} id={index+1} className='relative flex flex-col mb-5 px-3 py-4 bg-white rounded-lg drop-shadow-custom'>
            <div className='flex mb-2'>
              <div className='flex-shrink-0 mr-5 my-auto rounded-full w-7 h-7 text-center border border-[#29A19C] 
              text-xs text-[#29A19C] flex justify-center'>
                <span className='my-auto'>{text}</span>
              </div>
              <button className='ml-auto' onClick={() => setLastReadVerse(numberSurah, surah, text)}>
                <Image 
                  src='/images/icon/bookmark.svg'
                  width={24}
                  height={24}
                  alt=''
                />
              </button>
            </div>
            <div className='my-auto'>
              <div className='text-[#0C1517] text-2xl font-bold arab mb-3 leading-[48px]'>{verse[text]}</div>
              <div className='text-[#8A8A8E] text-xs leading-[18px]'>{translations.id.text[text]}</div>
            </div>
          </div>
        ))
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