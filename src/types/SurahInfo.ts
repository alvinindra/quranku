export interface SurahInfo {
  translation: string,
  arabic: string,
  latin: string,
  ayah_count: number,
  index: number,
  opening: string,
  closing: string,
}
export interface SurahInfoJson {
  surah_info: SurahInfo[],
}