"use client";
import { useEffect, useMemo, useState } from "react";
import Surah from "./Surah";

import storageKey from "@/constant/storage-key";
import { getItem } from "@/utils/storage";
import type { LastRead } from "@/types/LastRead";
import type { SurahInfo, SurahInfoJson } from "@/types/SurahInfo";

export default function ListSurah({ surah_info }: SurahInfoJson) {
  const [query, setQuery] = useState("");
  const [lastReadSurah, setLastReadSurah] = useState<string | null>(null);

  // localStorage is client-only: read on mount to avoid hydration mismatch.
  useEffect(() => {
    const lastRead = getItem<LastRead>(storageKey.LAST_READ, storageKey.VERSION);
    setLastReadSurah(lastRead?.numberSurah ?? null);
  }, []);

  const filtered = useMemo(
    () =>
      surah_info?.filter(
        (item: SurahInfo) =>
          query === "" ||
          item.latin.toLowerCase().includes(query.toLowerCase()),
      ) ?? [],
    [surah_info, query],
  );

  return (
    <>
      <div className="drop-shadow-custom dark:drop-shadow-dark relative my-6 flex">
        <svg
          className="absolute top-1/2 left-2 flex h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
        </svg>
        <input
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded-lg bg-white px-4 py-2 pl-8 text-sm text-black focus:outline-hidden dark:bg-[#3D3D3D] dark:text-white"
          placeholder="Cari surat"
        />
      </div>
      <div className="relative flex flex-col">
        {filtered.map((item: SurahInfo) => (
          <Surah
            key={item.index}
            item={item}
            isLastRead={item.index.toString() === lastReadSurah}
          />
        ))}
      </div>
    </>
  );
}
