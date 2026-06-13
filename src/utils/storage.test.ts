import { describe, it, expect, beforeEach } from 'vitest'
import { getItem, setItem } from '@/utils/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('case 1: setItem then getItem with matching version returns value', () => {
    setItem('K', { a: 1 } as any, '1.0.0')
    expect(getItem('K', '1.0.0')).toEqual({ a: 1 })
  })

  it('case 2: getItem with mismatched version returns undefined', () => {
    setItem('K', { a: 1 } as any, '1.0.0')
    expect(getItem('K', '2.0.0')).toBeUndefined()
  })

  it('case 3: getItem for missing key returns undefined', () => {
    expect(getItem('MISSING', '1.0.0')).toBeUndefined()
  })

  it('case 4: corrupt JSON returns null', () => {
    localStorage.setItem('K', 'not-json')
    expect(getItem('K', '1.0.0')).toBeNull()
  })

  it('case 5: payload without version returns value', () => {
    localStorage.setItem('K', JSON.stringify({ value: 'x' }))
    expect(getItem('K', '1.0.0')).toBe('x')
  })
})
