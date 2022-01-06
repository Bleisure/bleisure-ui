import { __Fonts, __FontSizes, __FontWeights } from './types'

export const FontSizes: __FontSizes = {
  /**
   * @description Paragraph text — 12px
   */
  p: 12,
  /**
   * @description First priority header — 32px
   */
  h1: 32,
  /**
   * @description Second priority header — 24px
   */
  h2: 24,
  /**
   * @description Third priority header — 18.72px
   */
  h3: 18.72,
  /**
   * @description Fourth priority header — 16px
   */
  h4: 16,
  /**
   * @description Fifth priority header — 13.28px
   */
  h5: 13.28,
  /**
   * @description Sixth priority header — 10.72px
   */
  h6: 10.72,
}

export const Fonts: __Fonts = {
  main: 'Gilroy',
  additional: 'Roboto',
}

export const FontWeights: __FontWeights = {
  thin: 100,
  ultraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
}
