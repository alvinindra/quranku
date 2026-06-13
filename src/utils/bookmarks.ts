import storageKey from '@/constant/storage-key'
import { getItem, setItem } from '@/utils/storage'
import type { LastRead } from '@/types/LastRead'

const sameAyah = (a: LastRead, numberSurah: string, verse: string) =>
  a.numberSurah === numberSurah && a.verse === verse

export const getBookmarks = (): LastRead[] => {
  const items = getItem<LastRead[]>(storageKey.BOOKMARKS, storageKey.VERSION)
  return Array.isArray(items) ? items : []
}

export const isBookmarked = (numberSurah: string, verse: string): boolean =>
  getBookmarks().some((item) => sameAyah(item, numberSurah, verse))

/**
 * Adds the ayah if it is not yet saved (returns true), or removes it if it is
 * already saved (returns false). Dedupes by numberSurah + verse.
 */
export const toggleBookmark = (item: LastRead): boolean => {
  const bookmarks = getBookmarks()
  const exists = bookmarks.some((b) => sameAyah(b, item.numberSurah, item.verse))

  if (exists) {
    const next = bookmarks.filter(
      (b) => !sameAyah(b, item.numberSurah, item.verse),
    )
    setItem<LastRead[]>(storageKey.BOOKMARKS, next, storageKey.VERSION)
    return false
  }

  const next = [...bookmarks, item]
  setItem<LastRead[]>(storageKey.BOOKMARKS, next, storageKey.VERSION)
  return true
}

export const removeBookmark = (numberSurah: string, verse: string): void => {
  const next = getBookmarks().filter(
    (item) => !sameAyah(item, numberSurah, verse),
  )
  setItem<LastRead[]>(storageKey.BOOKMARKS, next, storageKey.VERSION)
}
