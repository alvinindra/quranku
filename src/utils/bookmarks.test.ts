import { describe, it, expect, beforeEach } from 'vitest'
import {
  getBookmarks,
  isBookmarked,
  removeBookmark,
  toggleBookmark,
} from '@/utils/bookmarks'
import type { LastRead } from '@/types/LastRead'

const ayah = (numberSurah: string, verse: string): LastRead => ({
  numberSurah,
  surah: 'Al-Baqarah',
  verse,
})

describe('bookmarks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('case 1: getBookmarks returns [] when none stored', () => {
    expect(getBookmarks()).toEqual([])
  })

  it('case 2: toggleBookmark adds when absent and returns true', () => {
    expect(toggleBookmark(ayah('2', '5'))).toBe(true)
    expect(getBookmarks()).toHaveLength(1)
    expect(isBookmarked('2', '5')).toBe(true)
  })

  it('case 3: toggleBookmark removes when present and returns false', () => {
    toggleBookmark(ayah('2', '5'))
    expect(toggleBookmark(ayah('2', '5'))).toBe(false)
    expect(getBookmarks()).toHaveLength(0)
    expect(isBookmarked('2', '5')).toBe(false)
  })

  it('case 4: toggle dedupes by numberSurah + verse', () => {
    toggleBookmark(ayah('2', '5'))
    toggleBookmark(ayah('2', '6'))
    toggleBookmark(ayah('3', '5'))
    expect(getBookmarks()).toHaveLength(3)
    // same surah + verse should not duplicate, it toggles off
    expect(toggleBookmark(ayah('2', '5'))).toBe(false)
    expect(getBookmarks()).toHaveLength(2)
  })

  it('case 5: removeBookmark removes only the matching ayah', () => {
    toggleBookmark(ayah('2', '5'))
    toggleBookmark(ayah('2', '6'))
    removeBookmark('2', '5')
    expect(isBookmarked('2', '5')).toBe(false)
    expect(isBookmarked('2', '6')).toBe(true)
    expect(getBookmarks()).toHaveLength(1)
  })
})
