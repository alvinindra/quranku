import Header from '@/components/layout/Header'
import IconMore from '@/components/icons/icon-more.svg'
import Link from 'next/link'
import { DoaInfo, DoaInfoJson } from '@/types/DoaInfo'
import Image from 'next/image'

export const metadata = {
  title: 'Doa Harian - Quranku',
}

export default async function DoaHarianPage() {
  const res: DoaInfoJson = await import('@/data/doa-info.json')
  const doa_info = res.doa_info.map((item: DoaInfo, index: number) => ({
    ...item,
    index: index,
  }))

  return (
    <>
      <Header isFixed={true} isBack={true} title="Doa Harian" />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="relative w-full mb-3 mt-[52px]"></div>
        <div className="flex flex-col gap-3 w-full mb-6">
          {doa_info.map((item: DoaInfo) => (
            <Link href={'/doa-harian/' + item.slug} key={item.slug}>
              <div className="relative flex px-3 py-4 bg-white dark:bg-[#3D3D3D] rounded-lg drop-shadow-custom dark:drop-shadow-dark cursor-pointer">
                <div className="me-auto text-xs font-medium">{item.title}</div>
                <Image src={IconMore} alt='' className="my-auto fill-white dark:invert-[1] dark:brightness-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
