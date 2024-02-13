import Header from '@/components/layout/Header'
import Head from 'next/head'
import Link from 'next/link'
import Illustration404 from '@/components/icons/icon-illustration-404.svg'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan - Quranku</title>
      </Head>
      <Header isFixed={true} isBack={true} title="404" />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="relative w-full mb-3 mt-[52px]"></div>
        <div className="flex flex-col w-full mt-[40px] text-center mb-6">
          <Illustration404 className="mx-auto" />
          <div className="my-3 font-semibold text-sm">
            Halaman Tidak Ditemukan
          </div>
          <div className="text-xs text-[#8A8A8E] dark:text-white italic">
            “Tunjukilah kami jalan yang lurus.” <br />
            (QS. Al-Fatihah: 6)
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
