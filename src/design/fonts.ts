import { UniqueArray } from '../types'
import { IfStrictEquals, ToBeTrue } from '../types/check'

/**
 * @FONT_FAMILY
 */
export const fontFamilies = ['main', 'additional'] as const

type FONT_FAMILIES_KEYS_TEST_SUITE = [
  ToBeTrue<
    'Unique font families',
    IfStrictEquals<UniqueArray<typeof fontFamilies>, typeof fontFamilies>
  >,
]

export type FontFamilyName = typeof fontFamilies[number]

export type FontFamily = Readonly<Record<FontFamilyName, string>>

export interface HasFontFamily {
  fontFamily: FontFamilyName
}

export const Fonts: FontFamily = {
  main: 'Gilroy',
  additional: 'Roboto',
}

/**
 * @FONT_SIZE
 */
export const fontSizeKeys = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

type FONT_SIZE_KEYS_TEST_SUITE = [
  ToBeTrue<
    'Unique font-size keys',
    IfStrictEquals<UniqueArray<typeof fontSizeKeys>, typeof fontSizeKeys>
  >,
]

export type FontSizeKey = typeof fontSizeKeys[number]

export type FontSizeChart = Readonly<Record<FontSizeKey, number>>

export interface HasFontSize {
  fontSize: FontSizeKey
}

export const FontSizes: FontSizeChart = {
  p: 12,
  h1: 32,
  h2: 24,
  h3: 18.72,
  h4: 16,
  h5: 13.28,
  h6: 10.72,
}

/**
 * @FONT_WEIGHT
 */
export const fontThicknessLevel = [
  'thin',
  'ultraLight',
  'light',
  'regular',
  'medium',
  'semiBold',
  'bold',
  'extraBold',
  'black',
] as const

type FONT_WEIGHT_TEST_SUITE = [
  ToBeTrue<
    'Unique thikness level',
    IfStrictEquals<UniqueArray<typeof fontThicknessLevel>, typeof fontThicknessLevel>
  >,
]

export type FontThicknessLevel = typeof fontThicknessLevel[number]

export type FontThickness = Readonly<Record<FontThicknessLevel, number>>

export interface HasFontWeight {
  fontWeight: FontThicknessLevel
}

export const FontWeights: FontThickness = {
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

export interface HasTypeOptions extends HasFontSize, HasFontFamily, HasFontWeight {
  fontSize: FontSizeKey
}
