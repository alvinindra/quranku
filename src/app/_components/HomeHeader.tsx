"use client"

import storageKey from "@/constant/storage-key"
import { getItem } from "@/utils/storage"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function HomeHeader() {
  const router = useRouter()
  const cacheLastRead = getItem(storageKey.LAST_READ, storageKey.VERSION) || {}
  const hasCache = Object.keys(cacheLastRead).length > 0

  const gotoLastRead = () => {
    if (hasCache) {
      router.push(`/surah/${cacheLastRead.numberSurah}#${cacheLastRead.verse}`)
    }
  }

  return <div
    className={`relative w-full ${hasCache ? 'cursor-pointer' : ''}`}
    onClick={gotoLastRead}
  >
    <div className="absolute z-10 left-5 top-5">
      <div className="flex mb-6">
        <Image
          className="rounded-lg max-w-[20px]"
          src="/images/icon/lastread.svg"
          width={20}
          height={20}
          alt=""
        />
        <div className="text-sm ml-2 text-white">Terakhir Dibaca</div>
      </div>
      {hasCache ? (
        <>
          <div className="font-bold text-base mb-[3px] text-white">
            {cacheLastRead.surah}
          </div>
          <div className="text-xs text-white">
            Ayat {cacheLastRead.verse}
          </div>
        </>
      ) : (
        <>
          <div className="font-bold text-base mb-[3px] text-white">
            <div>Ayo baca </div>
            <div>Al-Quran</div>
          </div>
        </>
      )}
    </div>
    <Image
      className="rounded-lg w-full"
      src="/images/bg-lastread.svg"
      width={320}
      height={130}
      priority
      alt=""
    />
  </div>
}