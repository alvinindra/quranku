import Header from '@/components/layout/Header'
import ListSurah from '@/components/ListSurah'
import HomeMenu from '@/components/menu/HomeMenu'
import HomeHeader from './_components/HomeHeader'
import HomeScrollToTop from './_components/HomeScrollToTop'
import { SurahInfo } from '@/types/SurahInfo'

export default async function Home() {
  const res: { surah_info: SurahInfo[] } = await import('@/data/surah-info.json')

  return (
    <div className="flex flex-col items-center justify-center">
      <Header title="Quranku" />
      <main className="px-[20px] w-full">
        <HomeHeader />
        <HomeMenu />
        <ListSurah surah_info={res?.surah_info} />
      </main>
      <HomeScrollToTop />
    </div>
  )
}
