import { UniqueArray } from '../types'
import { IfStrictEquals, IsTrue } from '../types/check'

export const sizeKeys = ['base', 'l', 'm', 's', 'xl'] as const

type SIZE_KEYS_TEST_SUITE = IsTrue<IfStrictEquals<UniqueArray<typeof sizeKeys>, typeof sizeKeys>>

export type SizeKey = typeof sizeKeys[number]

export type SizeChart = Readonly<Record<SizeKey, number>>

export const Sizes: SizeChart = {
  s: 0.6,
  m: 0.8,
  base: 1,
  l: 1.2,
  xl: 1.4,
}

export const createSizeChart = (base: number): SizeChart =>
  sizeKeys.reduce(
    (result, current) => ({
      ...result,
      [current]: base * Sizes[current],
    }),
    {
      base,
    } as SizeChart,
  )
