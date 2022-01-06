import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colors } from '../../../assets/styles/colors'
import { Fonts, FontSizes, FontWeights } from '../../../assets/styles/fonts'
import { Sizes } from '../../../assets/styles/sizes'
import {
  __Colors,
  __Fonts,
  __FontSizes,
  __FontWeights,
} from '../../../assets/styles/types'
import { __Props } from '../../../types/props'

export namespace Input {
  export namespace Props {
    interface Optional extends __Props.Optional {
      readonly inputProps?: InputHTMLAttributes<HTMLInputElement>
    }

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {
      readonly color: keyof __Colors
      readonly fontFamily: keyof __Fonts
      readonly fontSize: keyof __FontSizes
      readonly fontWeight: keyof __FontWeights
    }

    export interface Actual extends Default, Required, Optional {}

    export interface Props
      extends Partial<Default>,
        Required,
        Optional,
        __Props.HasRef<HTMLInputElement> {}
  }

  export const defaultProps: Props.Default = {
    size: 'base',
    color: 'main',
    fontFamily: 'main',
    fontSize: 'p',
    fontWeight: 'regular',
  }

  namespace Styled {
    export const Input = styled.input(({}) => ({
      border: 'none',
      background: 'transparent',
      outline: 'none',
      alignSelf: 'center',
      width: '100%',
    }))

    export const Label = styled.label<Props.Actual>(
      ({ size, color, fontFamily, fontSize, fontWeight }) => ({
        width: '100%',
        height: '100%',
        display: 'grid',
        '& > input': {
          color: Colors[color],
          fontFamily: Fonts[fontFamily],
          fontSize: FontSizes[fontSize] * Sizes[size],
          fontWeight: FontWeights[fontWeight],
        },
      }),
    )
  }

  export const Component = ({ getRef, inputProps, ...props }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <Styled.Label {...actualProps}>
        <Styled.Input ref={getRef} {...inputProps} />
      </Styled.Label>
    )
  }
}
