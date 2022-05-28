import React, { useMemo } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import Colour from '../../../design/colours'
import { Fonts, FontSizes, FontWeights, HasTypeOptions } from '../../../design/fonts'
import { Merge } from '../../../types'
import { exist, isEmptyArray } from '../../../utils/array.utils'
import { isStringArray } from '../../../utils/string.utils'
import { string } from 'fp-ts'
export namespace Text {
  export const ComponentName = 'Text'

  type Customizer = Array<
    Merge<
      Partial<ActualProps>,
      {
        match: string
      }
    >
  >

  export type PartialProps = P.HasChildren

  export interface DefaultProps extends Colour.Property, HasTypeOptions {
    customize: Customizer
  }

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {}

  type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'children'>

  export const defaultProps: DefaultProps = {
    colour: Colour.MAIN,
    fontFamily: 'main',
    fontSize: 'p',
    fontWeight: 'regular',
    customize: [],
  }

  export const Component = ({ children, ...props }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    const { customize } = actualProps

    const text = useMemo(() => childrenOnlyStrings(children), [children])

    if (!text) return null

    // TODO: Types
    // TODO: IF NO CUSTOMIZER
    const strings = useMemo(() => {
      const result: Array<{ text: string; props: TextProps }> = []

      for (const { match, ...rest } of customize) {
        // Only first match
        const startIndex = text.search(match)
        const start = text.slice(0, startIndex)
        result.push({ text: start, props: actualProps })
        result.push({
          text: match,
          props: {
            ...actualProps,
            ...rest,
            colour: rest.colour ?? actualProps.colour,
          },
        })
        const end = text.slice(startIndex + match.length, text.length - 1)
        result.push({ text: end, props: actualProps })

        // All matches
        // const strings = text.split(match)
      }

      return result
    }, [text, customize, actualProps])

    return (
      <>
        {strings.map(({ props, text }) => (
          <Text {...props}>{text}</Text>
        ))}
      </>
    )
  }

  Component.displayName = ComponentName

  interface TextProps extends ActualProps {}

  export const Text = styled.span<TextProps>(({ colour, fontFamily, fontSize, fontWeight }) => ({
    fontFamily: Fonts[fontFamily],
    fontSize: FontSizes[fontSize],
    fontWeight: FontWeights[fontWeight],
    color: Colour.pallete[colour],
    transition: '0.1s ease-in-out',
    '::selection': {
      background: Colour.pallete[colour],
      colour: Colour.pallete[Colour.contrasts[colour]],
    },
  }))

  type COMPONENT_VALIDATION_FN = <T extends React.ReactNode>(c: T) => string | null

  export const childrenOnlyStrings: COMPONENT_VALIDATION_FN = (children) => {
    const strings = React.Children.toArray(children)

    if (!isStringArray(strings)) {
      console.error('Text component allows only strings as children')
      return null
    }

    return strings.join('')
  }
}
