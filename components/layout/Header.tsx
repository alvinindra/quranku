import { useRouter } from 'next/router';
import Image from 'next/image'

type HeaderProps = {
  isBack?: boolean;
};

export default function Header({ isBack = false }: HeaderProps) {
  const router = useRouter();

  return (
    <header className='w-full flex bg-white px-5 py-[14px] relative mb-[2px]'>
      {isBack &&
        <button className='absolute'>
          <Image src='/images/icon/back.svg' width={24} height={24} alt='' />
        </button>
      }
      <div className='mx-auto'>
        <div className='text-base font-bold'>Quranku</div>
      </div>
    </header>
  );
}