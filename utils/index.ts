export const __isNotNull = (variable: any) => {
  if (typeof variable !== 'undefined' && variable !== null) {
    return true
  }
  return false
}