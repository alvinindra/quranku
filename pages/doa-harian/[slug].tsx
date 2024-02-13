import Header from '@/components/layout/Header'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SurahPage({ doa }: any) {
  const router = useRouter()
  const makeTitle = (slug: any) => {
    var words = slug.split('-')

    for (var i = 0; i < words.length; i++) {
      var word = words[i]
      words[i] = word.charAt(0).toUpperCase() + word.slice(1)
    }

    return words.join(' ')
  }

  return (
    <>
      <Head>
        <title>{makeTitle(router.query.slug)} - Quranku</title>
      </Head>
      <Header
        isFixed={true}
        isBack={true}
        title={makeTitle(router.query.slug)}
      />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="flex flex-col relative w-full mt-[76px]">
          <div className="flex text-center mx-auto mb-4">
            <div className="flex-shrink-0 my-auto text-center text-xs font-medium flex justify-center truncate">
              {makeTitle(router.query.slug)}
            </div>
          </div>
          {doa.map((item: any, indexDoa: number) => (
            <div
              key={indexDoa}
              className="relative flex flex-col mb-5 px-3 py-4 bg-white dark:bg-[#3D3D3D] rounded-lg drop-shadow-custom dark:drop-shadow-dark"
            >
              {item.title && (
                <div className="flex mb-2">
                  <div className="flex-shrink-0 mr-5 my-auto text-center text-xs text-[#29A19C] flex justify-center truncate">
                    {item.title}
                  </div>
                </div>
              )}
              <div className="my-auto">
                <div className="text-[#0C1517] dark:text-white text-2xl font-bold arab mb-3 leading-[52px]">
                  {item.arabic}
                </div>
                <div className="text-[#8A8A8E] dark:text-white text-xs leading-[18px]">
                  {item.translation}
                </div>
                <div className="text-[#81818B] mt-2 font-medium dark:text-white text-[11px] leading-[14px]">
                  {item.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await import('@/data/doa-info.json')

  return {
    paths: res.doa_info.map((item: any) => ({
      params: {
        slug: item.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  const res = await import(`@/data/doa-harian/${params.slug}.json`)
  const doa = res.data
  return {
    props: {
      doa,
    },
  }
}
