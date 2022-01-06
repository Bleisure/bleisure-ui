import { __Sizes } from './types'

export const Sizes: __Sizes = {
  s: 0.6,
  m: 0.8,
  base: 1,
  l: 1.2,
  xl: 1.4,
}

export const SizesProperties = Object.keys(Sizes)

export function createSizeChart(size: number): __Sizes {
  return SizesProperties.reduce(
    (r, c) => ({
      ...r,
      [c]: size * Sizes[c],
    }),
    {} as __Sizes,
  )
}
