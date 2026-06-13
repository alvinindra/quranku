"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBookmarks, removeBookmark } from "@/utils/bookmarks";
import type { LastRead } from "@/types/LastRead";

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<LastRead[]>([]);

  // localStorage is client-only: read on mount to avoid hydration mismatch.
  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (numberSurah: string, verse: string) => {
    removeBookmark(numberSurah, verse);
    setBookmarks(getBookmarks());
  };

  return (
    <div className="flex flex-col items-center justify-center px-[20px]">
      <div className="relative mt-[76px] flex w-full flex-col">
        {bookmarks.length === 0 ? (
          <div className="text-center text-sm text-[#8A8A8E] dark:text-white">
            Belum ada ayat tersimpan.
          </div>
        ) : (
          bookmarks.map((item) => (
            <div
              key={`${item.numberSurah}:${item.verse}`}
              className="drop-shadow-custom dark:drop-shadow-dark relative mb-5 flex items-center rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]"
            >
              <Link
                href={`/surah/${item.numberSurah}#${item.verse}`}
                className="my-auto flex-1"
              >
                <div className="font-semibold text-[#29A19C]">{item.surah}</div>
                <div className="text-xs text-[#8A8A8E] dark:text-white">
                  Ayat {item.verse}
                </div>
              </Link>
              <button
                type="button"
                aria-label="Hapus dari simpanan"
                onClick={() => handleRemove(item.numberSurah, item.verse)}
                className="ml-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-xl leading-none text-[#8A8A8E] transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#4d4d4d]"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
