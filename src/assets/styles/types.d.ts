import { Fonts, FontSizes } from './fonts'

export interface __Colors {
  readonly main: string
  readonly primary: string
  readonly secondary: string
  readonly background: string
  readonly foreground: string
  readonly input: string
}

export interface __Sizes {
  readonly s: number
  readonly m: number
  readonly base: number
  readonly l: number
  readonly xl: number
}

export interface __Fonts {
  readonly main: string
  readonly additional: string
}

export interface __FontSizes {
  readonly p: number
  readonly h1: number
  readonly h2: number
  readonly h3: number
  readonly h4: number
  readonly h5: number
  readonly h6: number
}

export interface __FontWeights {
  readonly thin: number
  readonly ultraLight: number
  readonly light: number
  readonly regular: number
  readonly medium: number
  readonly semiBold: number
  readonly bold: number
  readonly extraBold: number
  readonly black: number
}
