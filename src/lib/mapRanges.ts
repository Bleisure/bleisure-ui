export interface Range {
  from: number
  to: number
}
type MapRangesFunc = (c: number, r1: Range, r2: Range) => number

/**
 *
 * @param current Value that needs to be converted to another number range
 * @param r1 Source range
 * @param r2 Target range
 * @returns converted number
 */
export const mapRanges: MapRangesFunc = (current, r1, r2) =>
  ((current - r1.from) * (r2.to - r2.from)) / (r1.to - r1.from) + r2.from
