import { useRouter } from 'next/router';
import * as React from 'react';

type HeaderProps = {
  isBack?: boolean;
};

export default function Header({ isBack = false }: HeaderProps) {
  const router = useRouter();

  return (
    <header>
      <div className='bg-white px-24px py-14px text-center'>
        Quranku
      </div>
    </header>
  );
}