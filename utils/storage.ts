import { __isNotNull } from './index'

export const getItem = (key: string, v: string) => {
  try {
    const cache: any = localStorage.getItem(key)
    if (__isNotNull(cache)) {
      const dataInCache = JSON.parse(cache)
      if (__isNotNull(dataInCache.value)) {
        // check cache version
        if (__isNotNull(dataInCache.v) && __isNotNull(v)) {
          const versionInCache = dataInCache.v
          if (v === versionInCache) { // only return value when version was matched
            return dataInCache.value
          } else {
            // @TODO cek delete item
            // localStorage.deleteItem(key)
          }
        } else { return dataInCache.value } // return value when version null without checking version
      }
    }
  } catch (e) {
    return null
  }
}

export const setItem = (key: any, value: '', version: string) => {
  try {
    const data = {
      v: version,
      value
    }
    const valString = JSON.stringify(data)
    localStorage.setItem(key, valString)
    return value
  } catch (e) {
    return null
  }
}
