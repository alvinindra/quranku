type CachedItem<T> = { v?: string; value: T }

export const getItem = <T>(key: string, version: string): T | null => {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    const cached = JSON.parse(raw) as CachedItem<T>
    if (cached.value === undefined || cached.value === null) return null
    if (cached.v === undefined || cached.v === null) return cached.value
    if (cached.v === version) return cached.value
    localStorage.removeItem(key)
    return null
  } catch {
    return null
  }
}

export const setItem = <T>(key: string, value: T, version: string): T | null => {
  try {
    localStorage.setItem(key, JSON.stringify({ v: version, value }))
    return value
  } catch {
    return null
  }
}
