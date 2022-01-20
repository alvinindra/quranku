import { useState } from 'react';
import Surah from './Surah'

export default function ListSurah({ listFullSurah }: any) {
  const [query, setQuery] = useState("")
  
  return (
    <>
      <div className="flex my-6 drop-shadow-custom">
        <svg className="flex absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
            </path>
        </svg>
        <input type="text" onChange={event => setQuery(event.target.value)} className="text-sm text-black rounded-lg appearance-none focus:outline-none focus:shadow-outline pl-8 px-4 py-2 w-full" placeholder="Cari surat" />
      </div>
      <div className='flex flex-col relative'>
      {
        listFullSurah.filter((item: any) => {
          if (query === '') {
            return item
          } else if (item.latin.toLowerCase().includes(query.toLowerCase())) {
            return item
          }
        }).map((item: any, index: any) => (
          <Surah 
              key={index}
              item={item}
            />
        ))
      }
      </div>
    </>
  );
}