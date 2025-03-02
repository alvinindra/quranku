import Header from '@/components/layout/Header'
import Link from 'next/link'
import IllustrationComingSoon from '@/components/icons/icon-illustration-comingsoon.svg'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Segera Hadir - Quranku',
}

export default function ComingsoonPage() {
  return (
    <>
      <Header isFixed={true} isBack={true} title="Segera Hadir" />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="relative w-full mb-3 mt-[52px]"></div>
        <div className="flex flex-col w-full mt-[40px] text-center mb-6">
          <Image src={IllustrationComingSoon} alt='' className="mx-auto fill-white dark:fill-transparent" />
          <div className="my-3 font-semibold text-sm">
            Fitur Ini Segera Hadir
          </div>
          <div className="text-xs text-[#8A8A8E] dark:text-white">
            Doakan kami untuk menyelesaikan fitur ini. <br /> Terima kasih.
          </div>
          <Link
            href="/"
            className="bg-[#29A19C] p-3 mx-auto rounded-lg max-w-min text-xs font-medium text-white mt-4"
          >
            Kembali
          </Link>
        </div>
      </div>
    </>
  )
}
