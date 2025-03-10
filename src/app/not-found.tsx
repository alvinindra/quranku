import Illustration404 from '@/components/icons/icon-illustration-404.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="relative w-full mb-3 mt-[52px]"></div>
        <div className="flex flex-col w-full mt-[40px] text-center mb-6">
          <Image src={Illustration404} className="mx-auto" alt="" />
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