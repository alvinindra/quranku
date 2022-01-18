import { ReactChild, ReactFragment, ReactPortal } from 'react';
import Surah from './Surah'

export default function ListSurah({ listFullSurah }: any) {
  return (
    <>
      <div className='flex flex-col bg-white my-[14px] relative'>
        { listFullSurah 
            ? listFullSurah.map((item: any, index: any) => (
              <Surah 
                key={index}
                item={item}
              />
            ))
        : null}
      </div>
    </>
  );
}