import { useRouter } from 'next/router';
import Image from 'next/image'

type HeaderProps = {
  isFixed?: boolean
  isBack?: boolean
  title: string
};

export default function Header({ isFixed, isBack = false, title }: HeaderProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/')
  }

  return (
    <header className={`w-full flex bg-white px-5 py-[14px] mb-[2px] z-10
      ${isFixed ? 'fixed shadow-md left-0' : ''}
    `}>
      {isBack &&
        <button className='absolute' onClick={handleClick}>
          <Image src='/images/icon/back.svg' width={24} height={24} alt='' />
        </button>
      }
      <div className='mx-auto'>
        <div className='text-base font-bold text-black'>{title}</div>
      </div>
    </header>
  );
}