import { __Colors } from './types'

export const Colors: __Colors = {
  main: '#FFFFFF',
  primary: '#795AE5',
  secondary: '#E4E4E4',
  background: '#1E2226',
  foreground: '#000000',
  input: '#25292E',
}

export const Contrasts: { [key in keyof __Colors]: keyof __Colors } = {
  main: 'primary',
  primary: 'main',
  secondary: 'background',
  background: 'main',
  foreground: 'main',
  input: 'main',
}

export const Accents: { [key in keyof __Colors]: keyof __Colors } = {
  main: 'primary',
  primary: 'main',
  secondary: 'primary',
  background: 'main',
  foreground: 'primary',
  input: 'primary',
}

export const ColorsProperties = Object.keys(Colors)
