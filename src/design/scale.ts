import { UniqueArray } from '../types'
import { IfStrictEquals, ToBeTrue } from '../types/check'

namespace Scale {
  export const M: string & 'M' = 'M'
  export const S: string & 'S' = 'S'
  export const BASE: string & 'BASE' = 'BASE'
  export const L: string & 'L' = 'L'
  export const XL: string & 'XL' = 'XL'

  const keys = [M, S, BASE, L, XL] as const

  type SCALE_KEYS_TEST_SUITE = [
    ToBeTrue<'Unique scale keys', IfStrictEquals<UniqueArray<typeof keys>, typeof keys>>,
  ]

  type ScaleKey = typeof keys[number]

  export interface Property {
    scale: ScaleKey
  }

  type ScaleChart = Readonly<Record<ScaleKey, number>>

  export const get: ScaleChart = {
    [S]: 0.6,
    [M]: 0.8,
    [BASE]: 1,
    [L]: 1.2,
    [XL]: 1.4,
  }

  export const createChart = (base: number): ScaleChart =>
    keys.reduce(
      (result, current) => ({
        ...result,
        [current]: base * get[current],
      }),
      {
        [BASE]: base,
      } as ScaleChart,
    )
}

export default Scale
