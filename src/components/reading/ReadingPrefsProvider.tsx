"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import storageKey from "@/constant/storage-key";
import { getItem, setItem } from "@/utils/storage";
import type { ReadingPrefs } from "@/types/ReadingPrefs";

const DEFAULT_PREFS: ReadingPrefs = {
  arabicFontScale: 1,
  showTranslation: true,
  showTafsir: true,
  showSurahContext: false,
};

type ReadingPrefsContextValue = {
  prefs: ReadingPrefs;
  setPrefs: (next: Partial<ReadingPrefs>) => void;
};

const ReadingPrefsContext = createContext<ReadingPrefsContextValue | null>(
  null,
);

export default function ReadingPrefsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [prefs, setPrefsState] = useState<ReadingPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = getItem<ReadingPrefs>(
      storageKey.READING_PREFS,
      storageKey.VERSION,
    );
    if (stored) {
      setPrefsState({ ...DEFAULT_PREFS, ...stored });
    }
  }, []);

  const setPrefs = useCallback((next: Partial<ReadingPrefs>) => {
    setPrefsState((prev) => {
      const merged = { ...prev, ...next };
      setItem<ReadingPrefs>(
        storageKey.READING_PREFS,
        merged,
        storageKey.VERSION,
      );
      return merged;
    });
  }, []);

  return (
    <ReadingPrefsContext.Provider value={{ prefs, setPrefs }}>
      {children}
    </ReadingPrefsContext.Provider>
  );
}

export function useReadingPrefs(): ReadingPrefsContextValue {
  const ctx = useContext(ReadingPrefsContext);
  if (ctx === null) {
    // Safe fallback so consumers (e.g. Verse) never crash outside a provider.
    return { prefs: DEFAULT_PREFS, setPrefs: () => {} };
  }
  return ctx;
}
