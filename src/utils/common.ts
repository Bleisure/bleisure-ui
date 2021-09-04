export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 *
 * @param number any numeric value
 * @param textForm1 example: day / день
 * @param textForm2 example: days / дня
 * @param textForm3 example: days / дней
 */
export const chooseTextEnding = (
  number: number,
  textForm1: string,
  textForm2: string,
  textForm3: string,
): string => {
  const n = Math.abs(number) % 100
  const n1 = n % 10
  if (n1 === 1) return textForm1
  if (n1 > 1 && n1 < 5) return textForm2
  if (n > 10 && n < 20) return textForm3
  return textForm3
}
