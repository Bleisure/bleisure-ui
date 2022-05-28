import { UniqueArray } from '../types'
import { IfStrictEquals, ToBeTrue } from '../types/check'

namespace Colour {
  export const MAIN: string & 'MAIN' = 'MAIN'
  export const PRIMARY: string & 'PRIMARY' = 'PRIMARY'
  export const SECONDARY: string & 'SECONDARY' = 'SECONDARY'
  export const BACKGROUND: string & 'BACKGROUND' = 'BACKGROUND'
  export const FOREGROUND: string & 'FOREGROUND' = 'FOREGROUND'
  export const INPUT: string & 'INPUT' = 'INPUT'

  export const colourNames = [MAIN, PRIMARY, SECONDARY, BACKGROUND, FOREGROUND, INPUT] as const

  type ColourName = typeof colourNames[number]

  type __COLOUR_NAME_TEST_SUITE__ = [
    ToBeTrue<
      'Unique colour names',
      IfStrictEquals<UniqueArray<typeof colourNames>, typeof colourNames>
    >,
  ]

  type ColourPallete = Readonly<Record<ColourName, string>>

  export interface Property {
    colour: ColourName
  }

  export const pallete: ColourPallete = {
    [MAIN]: '#FFFFFF',
    [PRIMARY]: '#795AE5',
    [SECONDARY]: '#E4E4E4',
    [BACKGROUND]: '#1E2226',
    [FOREGROUND]: '#000000',
    [INPUT]: '#25292E',
  }

  export const contrasts: Readonly<Record<ColourName, ColourName>> = {
    [MAIN]: PRIMARY,
    [PRIMARY]: MAIN,
    [SECONDARY]: BACKGROUND,
    [BACKGROUND]: MAIN,
    [FOREGROUND]: MAIN,
    [INPUT]: MAIN,
  }

  export const accents: Readonly<Record<ColourName, ColourName>> = {
    [MAIN]: PRIMARY,
    [PRIMARY]: MAIN,
    [SECONDARY]: PRIMARY,
    [BACKGROUND]: MAIN,
    [FOREGROUND]: PRIMARY,
    [INPUT]: PRIMARY,
  }
}

export default Colour
