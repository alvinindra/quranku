export interface DoaInfoItem {
  title: string
  slug: string
  arabic: string
  latin: string
  translation: string
  source: string
}

export interface DoaInfo {
  title: string
  slug: string
}

export interface DoaInfoJson {
  doa_info: DoaInfo[],
}

export interface DzikirItem {
  title: string
  arabic: string
  translation: string
  source: string
}

export interface TeksArabItem {
  arabic: string
  latin: string
  translation: string
}