import React from 'react'
import { __Props } from '../../../types/props'
import styled from 'styled-components'
import { Colors, Contrasts } from '../../../assets/styles/colors'
import {
  __Colors,
  __Fonts,
  __FontSizes,
  __FontWeights,
  __Sizes,
} from '../../../assets/styles/types'
import { Fonts, FontSizes, FontWeights } from '../../../assets/styles/fonts'
import { Sizes } from '../../../assets/styles/sizes'

export namespace Text {
  export namespace Props {
    interface Optional extends __Props.Optional {}

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {
      readonly color: keyof __Colors
      readonly fontFamily: keyof __Fonts
      readonly fontSize: keyof __FontSizes
      readonly fontWeight: keyof __FontWeights
    }

    export interface Actual extends Default, Required, Optional {}

    export interface Props extends Partial<Default>, Required, Optional {}
  }

  export const defaultProps: Props.Default = {
    color: 'main',
    size: 'base',
    fontFamily: 'main',
    fontSize: 'p',
    fontWeight: 'regular',
  }

  export const Component = ({ children, ...props }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    return <Text {...actualProps}>{children}</Text>
  }

  const Text = styled.span<Props.Actual>(
    ({ color, size, fontFamily, fontSize, fontWeight }) => ({
      fontFamily: Fonts[fontFamily],
      fontSize: FontSizes[fontSize] * Sizes[size],
      fontWeight: FontWeights[fontWeight],
      display: 'inline-block',
      color: Colors[color],
      transition: '0.1s ease-in-out',
      '::selection': {
        background: Colors[color],
        color: Colors[Contrasts[color]],
      },
    }),
  )
}
