"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { useReadingPrefs } from "@/components/reading/ReadingPrefsProvider";

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.8;
const STEP = 0.1;

const clamp = (value: number) =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(value * 10) / 10));

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-2.5">
      <span className="text-sm text-[#0C1517] dark:text-white">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
          checked ? "bg-[#29A19C]" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export default function AppSettings() {
  const { prefs, setPrefs } = useReadingPrefs();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // next-themes resolves on the client only; guard against hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape and lock body scroll while the sheet is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const isDark = resolvedTheme === "dark";
  const decrease = () =>
    setPrefs({ arabicFontScale: clamp(prefs.arabicFontScale - STEP) });
  const increase = () =>
    setPrefs({ arabicFontScale: clamp(prefs.arabicFontScale + STEP) });

  const themeButton = (value: "light" | "dark", text: string, active: boolean) => (
    <button
      type="button"
      onClick={() => setTheme(value)}
      aria-pressed={mounted ? active : undefined}
      className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors ${
        mounted && active
          ? "border-[#29A19C] bg-[#29A19C]/10 font-semibold text-[#29A19C]"
          : "border-gray-300 text-[#8A8A8E] dark:border-gray-600 dark:text-white"
      }`}
    >
      {text}
    </button>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Pengaturan"
        className="flex h-6 w-6 cursor-pointer items-center justify-center text-[#0C1517] dark:text-white"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
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

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!isOpen}
          >
            <div
              onClick={() => setIsOpen(false)}
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Pengaturan"
              className={`absolute top-0 right-0 flex h-full w-[85%] max-w-xs flex-col bg-white shadow-xl transition-transform duration-300 dark:bg-[#2A2A2A] ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                <span className="text-base font-bold text-[#0C1517] dark:text-white">
                  Pengaturan
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#0C1517] hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <section className="mb-6">
                  <h3 className="mb-2 text-xs font-semibold tracking-wide text-[#8A8A8E] uppercase">
                    Tema
                  </h3>
                  <div className="flex gap-2">
                    {themeButton("light", "Terang", !isDark)}
                    {themeButton("dark", "Gelap", isDark)}
                  </div>
                </section>

                <section>
                  <h3 className="mb-1 text-xs font-semibold tracking-wide text-[#8A8A8E] uppercase">
                    Bacaan
                  </h3>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-[#0C1517] dark:text-white">
                      Ukuran teks Arab
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={decrease}
                        disabled={prefs.arabicFontScale <= MIN_SCALE}
                        aria-label="Perkecil teks"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#29A19C] text-lg text-[#29A19C] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm text-[#0C1517] dark:text-white">
                        {Math.round(prefs.arabicFontScale * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={increase}
                        disabled={prefs.arabicFontScale >= MAX_SCALE}
                        aria-label="Perbesar teks"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#29A19C] text-lg text-[#29A19C] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700">
                    <ToggleSwitch
                      label="Tampilkan terjemahan"
                      checked={prefs.showTranslation}
                      onChange={(next) => setPrefs({ showTranslation: next })}
                    />
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-700">
                    <ToggleSwitch
                      label="Tampilkan tentang surah"
                      checked={prefs.showSurahContext}
                      onChange={(next) => setPrefs({ showSurahContext: next })}
                    />
                  </div>
                </section>
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </>
  );
}
