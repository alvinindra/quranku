"use client"
import { useState } from 'react';
import Surah from './Surah'

import type { SurahInfo, SurahInfoJson } from '@/types/SurahInfo'

export default function ListSurah({ surah_info }: SurahInfoJson) {
  const [query, setQuery] = useState("")

  return (
    <>
      <div className="relative flex my-6 drop-shadow-custom dark:drop-shadow-dark">
        <svg className="flex absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
          </path>
        </svg>
        <input type="text" onChange={event => setQuery(event.target.value)} className="text-sm text-black dark:text-white rounded-lg appearance-none focus:outline-none focus:shadow-outline pl-8 px-4 py-2 w-full bg-white dark:bg-[#3D3D3D]" placeholder="Cari surat" />
      </div>
      <div className='flex flex-col relative'>
        {
          surah_info?.filter((item: SurahInfo) => {
            if (query === '') {
              return item
            } else if (item.latin.toLowerCase().includes(query.toLowerCase())) {
              return item
            }
          }).map((item: SurahInfo, index: number) => (
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