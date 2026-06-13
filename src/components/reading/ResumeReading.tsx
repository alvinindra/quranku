"use client";

import { useEffect, useState } from "react";
import storageKey from "@/constant/storage-key";
import { getItem } from "@/utils/storage";
import type { LastRead } from "@/types/LastRead";

export default function ResumeReading({
  numberSurah,
}: {
  numberSurah: string;
}) {
  const [verse, setVerse] = useState<string | null>(null);

  // localStorage is client-only: read on mount to avoid hydration mismatch.
  useEffect(() => {
    const lastRead = getItem<LastRead>(storageKey.LAST_READ, storageKey.VERSION);
    if (lastRead && lastRead.numberSurah === numberSurah && lastRead.verse) {
      setVerse(lastRead.verse);
    }
  }, [numberSurah]);

  const handleResume = () => {
    if (!verse) return;
    document
      .getElementById(verse)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!verse) return null;

  return (
    <div className="drop-shadow-custom dark:drop-shadow-dark mb-5 flex items-center rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]">
      <div className="my-auto flex-1 text-sm text-[#0C1517] dark:text-white">
        Lanjutkan baca ayat {verse}
      </div>
      <button
        type="button"
        onClick={handleResume}
        className="ml-3 shrink-0 cursor-pointer rounded-lg bg-[#29A19C] px-4 py-2 text-xs font-semibold text-white"
      >
        Lanjutkan
      </button>
    </div>
  );
}
