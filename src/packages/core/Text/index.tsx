import React, { ReactNode, useMemo } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { Colours, Contrasts } from '../../../design/colors'
import {
  FontFamilyName,
  Fonts,
  FontSizeKey,
  FontSizes,
  FontThicknessLevel,
  FontWeights,
} from '../../../design/fonts'
import { Sizes } from '../../../design/sizes'
import { Merge } from '../../../types'
import { doesNotExist, isEmptyArray } from '../../../utils/array.utils'
import { isStringArray, join } from '../../../utils/string.utils'
import Sizable, { SizableProps } from '../../modifiers/Sizable'
import { IfStrictEquals, IsTrue } from '../../../types/check'

export namespace Text {
  type Customizer = Array<
    Merge<
      Partial<ActualProps>,
      {
        match: string
      }
    >
  >

  export interface OptionalProps extends P.HasChildren {
    customize: Customizer
  }

  export interface DefaultProps extends P.HasColour {
    fontFamily: FontFamilyName
    fontSize: FontSizeKey
    fontWeight: FontThicknessLevel
  }

  export interface PropTypes extends Partial<DefaultProps>, Partial<OptionalProps> {}

  type ExcludedProps = 'customize' | 'children'

  type EXLUDED_PROPS_TEST_SUITE = [
    IsTrue<IfStrictEquals<ExcludedProps extends keyof PropTypes ? true : never, true>>,
  ]

  type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, ExcludedProps>

  export const defaultProps: DefaultProps = {
    colour: 'main',
    fontFamily: 'main',
    fontSize: 'p',
    fontWeight: 'regular',
  }

  export const Component = ({ children, customize, ...props }: PropTypes) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    const text = useMemo(() => childrenOnlyStrings(children), [children])

    if (!text) return null

    const generatedText = useMemo<JSX.Element>(() => {
      if (doesNotExist(customize) || isEmptyArray(customize))
        return createCustomString(text, [], actualProps)
      return createCustomString(text, customize, actualProps)
    }, [text, customize, actualProps])

    return generatedText
  }

  // TODO: WTF???
  export const TextContainer = styled.span(() => ({
    display: 'block',
  }))

  interface TextProps extends ActualProps, SizableProps {}

  export const Text = styled.span<TextProps>(
    ({ colour, size, fontFamily, fontSize, fontWeight }) => ({
      fontFamily: Fonts[fontFamily],
      fontSize: FontSizes[fontSize] * Sizes[size],
      fontWeight: FontWeights[fontWeight],
      color: Colours[colour],
      transition: '0.1s ease-in-out',
      '::selection': {
        background: Colours[colour],
        colour: Colours[Contrasts[colour]],
      },
    }),
  )

  type COMPONENT_VALIDATION_FN = <T extends React.ReactNode>(c: T) => string | null

  export const childrenOnlyStrings: COMPONENT_VALIDATION_FN = (children) => {
    const strings = React.Children.toArray(children)

    if (!isStringArray(strings)) {
      console.error('Text component allows only strings as children')
      return null
    }

    return strings.join('')
  }

  type CREATE_CUSTOM_STRING_FN = (
    text: string,
    customizer: Customizer,
    props: ActualProps,
  ) => JSX.Element

  const createCustomString: CREATE_CUSTOM_STRING_FN = (text, cst, props) => {
    const nodes = []
    let remainingText = text

    for (let i = 0, length = cst.length; i < length; i++) {
      const { match, ...rest } = cst[i]

      const firstString = remainingText.slice(0, remainingText.indexOf(match))
      nodes.push(
        {
          text: firstString,
          props,
        },
        {
          text: match,
          props: {
            ...props,
            ...rest,
            color: rest.colour ? rest.colour : props.colour,
          },
        },
      )
      remainingText = remainingText.slice(remainingText.indexOf(match) + 1)
    }

    nodes.push({
      text: remainingText,
      props,
    })

    return (
      <TextContainer>
        {nodes.map(({ text, props }, idx) => (
          <Sizable
            render={({ size }) => (
              <Text key={text + idx} {...{ size, ...props }}>
                {text}
              </Text>
            )}
          />
        ))}
      </TextContainer>
    )
  }
}
