"use client";

import { useState } from "react";
import { useReadingPrefs } from "@/components/reading/ReadingPrefsProvider";

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.8;
const STEP = 0.1;

const clamp = (value: number) =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(value * 10) / 10));

export default function ReadingSettings() {
  const { prefs, setPrefs } = useReadingPrefs();
  const [isOpen, setIsOpen] = useState(false);

  const decrease = () =>
    setPrefs({ arabicFontScale: clamp(prefs.arabicFontScale - STEP) });
  const increase = () =>
    setPrefs({ arabicFontScale: clamp(prefs.arabicFontScale + STEP) });

  return (
    <div className="relative mb-4 flex justify-end">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Pengaturan bacaan"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#29A19C] drop-shadow-custom dark:bg-[#3D3D3D] dark:drop-shadow-dark"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-11 right-0 z-50 w-64 rounded-lg bg-white p-4 drop-shadow-custom dark:bg-[#3D3D3D] dark:drop-shadow-dark">
          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-[#0C1517] dark:text-white">
              Ukuran font Arab
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={decrease}
                disabled={prefs.arabicFontScale <= MIN_SCALE}
                aria-label="Perkecil font"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#29A19C] text-lg text-[#29A19C] disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <span className="text-sm text-[#0C1517] dark:text-white">
                {Math.round(prefs.arabicFontScale * 100)}%
              </span>
              <button
                type="button"
                onClick={increase}
                disabled={prefs.arabicFontScale >= MAX_SCALE}
                aria-label="Perbesar font"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#29A19C] text-lg text-[#29A19C] disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-between">
            <span className="text-sm font-semibold text-[#0C1517] dark:text-white">
              Tampilkan terjemahan
            </span>
            <input
              type="checkbox"
              checked={prefs.showTranslation}
              onChange={(event) =>
                setPrefs({ showTranslation: event.target.checked })
              }
              className="h-4 w-4 accent-[#29A19C]"
            />
          </label>
        </div>
      )}
    </div>
  );
}
