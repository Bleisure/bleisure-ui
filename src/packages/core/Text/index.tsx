import React, { ReactNode, useMemo } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { Colors, Contrasts } from '../../../design/colors'
import {
  __Colors,
  __Fonts,
  __FontSizes,
  __FontWeights,
  __Sizes,
} from '../../../design/types'
import { Fonts, FontSizes, FontWeights } from '../../../design/fonts'
import { Sizes } from '../../../design/sizes'
import { Merge } from '../../../types'
import { doesNotExist, isEmptyArray } from '../../../utils/array.utils'
import { isStringArray, join } from '../../../utils/string.utils'

export namespace Text {
  type Customizer = Array<
    Merge<
      Partial<Props.Actual>,
      {
        match: string
      }
    >
  >

  export namespace Props {
    export type Optional = P.Optional<{
      custom: Customizer
    }>

    type Required = P.Required

    export type Default = P.Default<Merge<P.HasTypoOptions, P.HasColor>>

    export type Actual = P.Actual<Required, Default>

    export interface Props extends P.PropTypes<Required, Optional, Default> {}

    export const defaultProps: Default = {
      size: 'base',
      color: 'main',
      fontFamily: 'main',
      fontSize: 'p',
      fontWeight: 'regular',
    }
  }

  export const Component = ({ children, custom, ...props }: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    const text = useMemo(() => childrenOnlyStrings(children), [children])

    if (!text) return null

    const generatedText = useMemo<JSX.Element>(() => {
      if (doesNotExist(custom) || isEmptyArray(custom))
        return createCustomString(text, [], actualProps)
      return createCustomString(text, custom, actualProps)
    }, [text, custom, actualProps])

    return generatedText
  }

  export const TextContainer = styled.span(() => ({
    display: 'block',
  }))

  export const Text = styled.span<Props.Actual & Props.Optional>(
    ({ color, size, fontFamily, fontSize, fontWeight }) => ({
      fontFamily: Fonts[fontFamily],
      fontSize: FontSizes[fontSize] * Sizes[size],
      fontWeight: FontWeights[fontWeight],
      color: Colors[color],
      transition: '0.1s ease-in-out',
      '::selection': {
        background: Colors[color],
        color: Colors[Contrasts[color]],
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
    props: Props.Actual,
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
            color: rest.color ? rest.color : props.color,
          },
        },
      )
      remainingText = remainingText.slice(remainingText.indexOf(match) + 1)

      console.log(firstString, remainingText)
    }

    nodes.push({
      text: remainingText,
      props,
    })

    return (
      <TextContainer>
        {nodes.map(({ text, props }, idx) => (
          <Text key={text + idx} {...props}>
            {text}
          </Text>
        ))}
      </TextContainer>
    )
  }
}
