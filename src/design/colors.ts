import { UniqueArray } from '../types'
import { IfStrictEquals, IsTrue } from '../types/check'

export const colourNames = [
  'main',
  'primary',
  'secondary',
  'background',
  'foreground',
  'input',
] as const

export type ColourName = typeof colourNames[number]

type COLOUR_NAME_TEST_SUITE = IsTrue<
  IfStrictEquals<UniqueArray<typeof colourNames>, typeof colourNames>
>

export type ColourPalette = Readonly<Record<ColourName, string>>

export const Colours: ColourPalette = {
  main: '#FFFFFF',
  primary: '#795AE5',
  secondary: '#E4E4E4',
  background: '#1E2226',
  foreground: '#000000',
  input: '#25292E',
}

export const Contrasts: Readonly<Record<ColourName, ColourName>> = {
  main: 'primary',
  primary: 'main',
  secondary: 'background',
  background: 'main',
  foreground: 'main',
  input: 'main',
}

export const Accents: Readonly<Record<ColourName, ColourName>> = {
  main: 'primary',
  primary: 'main',
  secondary: 'primary',
  background: 'main',
  foreground: 'primary',
  input: 'primary',
}
