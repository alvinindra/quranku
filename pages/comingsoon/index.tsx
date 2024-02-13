import Header from '@/components/layout/Header'
import Head from 'next/head'
import Link from 'next/link'
import IllustrationComingSoon from '@/components/icons/icon-illustration-comingsoon.svg'

export default function ComingsoonPage() {
  return (
    <>
      <Head>
        <title>Segera Hadir - Quranku</title>
      </Head>
      <Header isFixed={true} isBack={true} title="Segera Hadir" />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="relative w-full mb-3 mt-[52px]"></div>
        <div className="flex flex-col w-full text-center mb-6">
          <IllustrationComingSoon className="mx-auto" />
          <div className="my-3">Fitur Ini Segera Hadir</div>
          <div className="text-xs text-[#8A8A8E]">
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
