"use client";

import Image from "next/image";
import storageKey from "@/constant/storage-key";
import { setItem } from "@/utils/storage";
import { getBookmarks, toggleBookmark } from "@/utils/bookmarks";
import type { LastRead } from "@/types/LastRead";
import { useReadingPrefs } from "@/components/reading/ReadingPrefsProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Bounce, toast, ToastContainer } from "react-toastify";

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
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [openTafsir, setOpenTafsir] = useState<Set<string>>(new Set());
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(
    new Set(),
  );
  // Audio recitation: a single shared HTMLAudioElement so only one ayah plays
  // at a time. playingAyah holds the currently-playing verse key (or null).
  const [playingAyah, setPlayingAyah] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Holds the latest ordered verse keys so the "ended" handler can auto-advance
  // without capturing a stale closure.
  const verseKeysRef = useRef<string[]>([]);

  // localStorage is client-only: read saved bookmarks on mount to avoid
  // SSR/hydration mismatches.
  useEffect(() => {
    const saved = getBookmarks()
      .filter((item) => item.numberSurah === numberSurah)
      .map((item) => item.verse);
    setBookmarkedVerses(new Set(saved));
  }, [numberSurah]);

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
  const handleBookmark = (
    numberSurah: string,
    surah: string,
    verse: string,
  ) => {
    const data: LastRead = { numberSurah, surah, verse };
    // Keep updating LAST_READ so the home "Terakhir Dibaca" card still works.
    setItem<LastRead>(storageKey.LAST_READ, data, storageKey.VERSION);

    const added = toggleBookmark(data);
    setBookmarkedVerses((prev) => {
      const next = new Set(prev);
      if (added) {
        next.add(verse);
      } else {
        next.delete(verse);
      }
      return next;
    });

    toast(added ? "Ayat disimpan" : "Ayat dihapus dari simpanan", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === "dark" ? "dark" : "light",
      transition: Bounce,
    });
  };

  const filteredVerseKeys = useMemo(
    () =>
      Object.keys(verse).filter((text) => query === "" || text.includes(query)),
    [verse, query],
  );

  // Keep the auto-advance reference in sync with the visible/ordered keys.
  useEffect(() => {
    verseKeysRef.current = filteredVerseKeys;
  }, [filteredVerseKeys]);

  // Mishary Alafasy 128kbps recitation via the everyayah CDN. Surah and ayah
  // numbers are zero-padded to 3 digits (e.g. surah 2 ayah 5 -> 002005.mp3).
  const buildAudioUrl = (ayah: string) => {
    const surahPad = String(Number(numberSurah)).padStart(3, "0");
    const ayahPad = String(Number(ayah)).padStart(3, "0");
    return `https://everyayah.com/data/Alafasy_128kbps/${surahPad}${ayahPad}.mp3`;
  };

  // Lazily create the shared audio element and wire up ended/error handlers
  // (client-only). Clean up listeners + pause on unmount.
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      setPlayingAyah((current) => {
        if (current === null) return null;
        const keys = verseKeysRef.current;
        const index = keys.indexOf(current);
        const nextKey = index >= 0 ? keys[index + 1] : undefined;
        if (nextKey) {
          audio.src = buildAudioUrl(nextKey);
          void audio.play().catch(() => {
            // Autoplay/advance failure is handled by the error listener.
          });
          return nextKey;
        }
        return null;
      });
    };

    const handleError = () => {
      toast.error("Audio gagal dimuat", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: theme === "dark" ? "dark" : "light",
        transition: Bounce,
      });
      setPlayingAyah(null);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
    // numberSurah is needed inside buildAudioUrl; theme keeps toast colour fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberSurah, theme]);

  const togglePlay = (ayah: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingAyah === ayah) {
      audio.pause();
      setPlayingAyah(null);
      return;
    }

    audio.src = buildAudioUrl(ayah);
    setPlayingAyah(ayah);
    void audio.play().catch(() => {
      // play() rejection surfaces via the "error" listener; nothing extra here.
    });
  };

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
          className={`drop-shadow-custom dark:drop-shadow-dark relative mb-5 flex flex-col rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D] ${
            playingAyah === text ? "ring-2 ring-[#29A19C]" : ""
          }`}
        >
          <div className="mb-2 flex items-center">
            <div className="my-auto mr-5 flex h-7 w-7 shrink-0 justify-center rounded-full border border-[#29A19C] text-center text-xs text-[#29A19C]">
              <span className="my-auto">{text}</span>
            </div>
            <button
              type="button"
              aria-label={
                playingAyah === text ? "Jeda audio" : "Putar audio ayat"
              }
              aria-pressed={playingAyah === text}
              className={`ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition ${
                playingAyah === text
                  ? "text-[#29A19C] opacity-100 ring-2 ring-[#29A19C]"
                  : "text-[#29A19C] opacity-40 hover:opacity-70"
              }`}
              onClick={() => togglePlay(text)}
            >
              {playingAyah === text ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              aria-label={
                bookmarkedVerses.has(text)
                  ? "Hapus dari simpanan"
                  : "Simpan ayat"
              }
              aria-pressed={bookmarkedVerses.has(text)}
              className={`ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition ${
                bookmarkedVerses.has(text)
                  ? "opacity-100 ring-2 ring-[#29A19C]"
                  : "opacity-40 hover:opacity-70"
              }`}
              onClick={() => handleBookmark(numberSurah, surah, text)}
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
      <ToastContainer />
    </>
  );
}
