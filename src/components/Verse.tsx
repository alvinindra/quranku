"use client";

import Image from "next/image";
import storageKey from "@/constant/storage-key";
import { setItem } from "@/utils/storage";
import type { LastRead } from "@/types/LastRead";
import { useReadingPrefs } from "@/components/reading/ReadingPrefsProvider";
import { useEffect, useMemo, useState } from "react";

type verseProps = {
  numberSurah: string;
  surah: string;
  verse: Record<string, string>;
  translations: {
    id: {
      name: string;
      text: any;
    };
  };
  tafsir?: {
    id: {
      kemenag: {
        name: string;
        source: string;
        text: Record<string, string>;
      };
    };
  };
};

export default function Verse({
  numberSurah,
  surah,
  verse,
  translations,
  tafsir,
}: verseProps) {
  const { prefs } = useReadingPrefs();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openTafsir, setOpenTafsir] = useState<Set<string>>(new Set());

  const toggleTafsir = (ayah: string) => {
    setOpenTafsir((prev) => {
      const next = new Set(prev);
      if (next.has(ayah)) {
        next.delete(ayah);
      } else {
        next.add(ayah);
      }
      return next;
    });
  };
  const setLastReadVerse = (
    numberSurah: string,
    surah: string,
    verse: string,
  ) => {
    const data: LastRead = { numberSurah, surah, verse };
    setItem<LastRead>(storageKey.LAST_READ, data, storageKey.VERSION);
    if (isOpen) {
      return setIsOpen(true);
    }
    setIsOpen(true);
  };

  const filteredVerseKeys = useMemo(
    () =>
      Object.keys(verse).filter((text) => query === "" || text.includes(query)),
    [verse, query],
  );

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => setIsOpen(false), 3000);
    return () => clearTimeout(t);
  }, [isOpen]);

  return (
    <>
      <div className="drop-shadow-custom dark:drop-shadow-dark relative mb-6 flex">
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
          pattern="[0-9]*"
          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          onChange={(event) => setQuery(event.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded-lg bg-white px-4 py-2 pl-8 text-sm text-black focus:outline-hidden dark:bg-[#3d3d3d] dark:text-white"
          placeholder="Cari ayat (Contoh : 2)"
        />
      </div>
      {filteredVerseKeys.map((text) => (
        <div
          key={text}
          id={text}
          className="drop-shadow-custom dark:drop-shadow-dark relative mb-5 flex flex-col rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]"
        >
          <div className="mb-2 flex">
            <div className="my-auto mr-5 flex h-7 w-7 shrink-0 justify-center rounded-full border border-[#29A19C] text-center text-xs text-[#29A19C]">
              <span className="my-auto">{text}</span>
            </div>
            <button
              className="ml-auto cursor-pointer"
              onClick={() => setLastReadVerse(numberSurah, surah, text)}
            >
              <Image
                src="/images/icon/bookmark.svg"
                width={24}
                height={24}
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </button>
          </div>
          <div className="my-auto">
            <div
              className="font-display arab mb-3 font-bold text-[#0C1517] dark:text-white"
              style={{
                fontSize: `calc(1.5rem * ${prefs.arabicFontScale})`,
                lineHeight: `calc(52px * ${prefs.arabicFontScale})`,
              }}
            >
              {verse[text]}
            </div>
            {prefs.showTranslation && (
              <div className="text-xs leading-[18px] text-[#8A8A8E] dark:text-white">
                {translations.id.text[text]}
              </div>
            )}
            {tafsir?.id?.kemenag?.text?.[text] && (
              <div className="mt-3 border-t border-gray-200 pt-2 dark:border-gray-600">
                <button
                  type="button"
                  onClick={() => toggleTafsir(text)}
                  aria-expanded={openTafsir.has(text)}
                  className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#29A19C]"
                >
                  {openTafsir.has(text) ? "Sembunyikan Tafsir" : "Lihat Tafsir"}
                  <svg
                    className={`h-3 w-3 transition-transform ${
                      openTafsir.has(text) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {openTafsir.has(text) && (
                  <div className="mt-2 text-xs leading-[20px] whitespace-pre-line text-[#8A8A8E] dark:text-white">
                    {tafsir.id.kemenag.text[text]}
                    <div className="mt-2 text-[11px] text-gray-400 italic">
                      — {tafsir.id.kemenag.name}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {isOpen && (
        <div className="fixed bottom-[50px] left-1/2 z-50 w-fit -translate-x-1/2 translate-y-1/2 rounded-md bg-[#29A19C] px-5 py-4 text-white transition duration-300">
          <div className="flex items-center space-x-2">
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <p className="text-sm font-semibold whitespace-nowrap">
              Berhasil menyimpan bacaan
            </p>
          </div>
        </div>
      )}
    </>
  );
}
