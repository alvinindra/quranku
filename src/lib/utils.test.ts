import { describe, it, expect } from 'vitest'
import { makeTitle, cn } from '@/lib/utils'

describe('makeTitle', () => {
  it('converts kebab-case slug to title case', () => {
    expect(makeTitle('sebelum-tidur')).toBe('Sebelum Tidur')
  })
})

describe('cn', () => {
  it('merges Tailwind classes, last wins on conflict', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('ignores falsy values', () => {
    expect(cn('a', false && 'b')).toBe('a')
  })
})
