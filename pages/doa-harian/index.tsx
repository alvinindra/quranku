import Header from '@/components/layout/Header'
import Head from 'next/head'
import IconMore from '@/components/icons/icon-more.svg'
import Link from 'next/link'
import { DoaInfo, DoaInfoJson } from '@/types/DoaInfo'

export default function DoaHarianPage({ doa_info }: DoaInfoJson) {
  return (
    <>
      <Head>
        <title>Doa Harian - Quranku</title>
      </Head>
      <Header isFixed={true} isBack={true} title="Doa Harian" />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="relative w-full mb-3 mt-[52px]"></div>
        <div className="flex flex-col gap-3 w-full mb-6">
          {doa_info.map((item: DoaInfo) => (
            <Link href={'/doa-harian/' + item.slug} key={item.slug}>
              <div className="relative flex px-3 py-4 bg-white dark:bg-[#3D3D3D] rounded-lg drop-shadow-custom dark:drop-shadow-dark cursor-pointer">
                <div className="me-auto text-xs font-medium">{item.title}</div>
                <IconMore className="my-auto fill-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await import('@/data/doa-info.json')
  const doa_info = res.doa_info.map((item: DoaInfo, index: number) => {
    let doa = {
      title: item.title,
      slug: item.slug,
    }
    return Object.assign({}, doa, { index: index })
  })

  return {
    props: {
      doa_info,
    },
  }
}
