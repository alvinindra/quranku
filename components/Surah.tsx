import Link from 'next/link';
import type { SurahInfo } from '@/types/SurahInfo'

interface typeItemObject {
  item: SurahInfo
}

export default function Surah({item}: typeItemObject) {
  return (
    <>
      <Link
        href={'/surah/'+item.index}
        passHref
      >
        <a className='relative flex mb-5 px-3 py-4 bg-white rounded-lg drop-shadow-custom'>
          <div className='mr-5 my-auto rounded-full w-6 h-6 text-center border border-[#29A19C] 
          text-xs text-[#29A19C] flex justify-center'><span className='my-auto'>{item.index}</span></div>
          <div className='my-auto'>
            <div className='text-[#29A19C] font-semibold'>{item.latin}</div>
            <div className='text-[#8A8A8E] text-xs'>{item.translation}, {item.ayah_count} ayat</div>
          </div>
        </a>
      </Link>
    </>
  );
}