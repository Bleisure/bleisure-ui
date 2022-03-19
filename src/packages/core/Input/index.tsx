import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design/colors'
import { Fonts, FontSizes, FontWeights } from '../../../design/fonts'
import { Sizes } from '../../../design/sizes'
import { __Colors, __Fonts, __FontSizes, __FontWeights } from '../../../design/types'
import * as P from '../../../types/props'
import { Merge } from '../../../types'

export namespace Input {
  export namespace Props {
    type Optional = P.Optional<{
      inputProps: InputHTMLAttributes<HTMLInputElement>
    }>

    type Required = P.Required

    export type Default = P.Default<Merge<P.HasTypoOptions, P.HasColor>>

    export type Actual = P.Actual<Required, Default>

    export interface Props
      extends P.PropTypes<Required, Optional, Default>,
        P.HasRef<HTMLInputElement> {}

    export const defaultProps: Default = {
      size: 'base',
      color: 'main',
      fontFamily: 'main',
      fontSize: 'p',
      fontWeight: 'regular',
    }
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
      ...Props.defaultProps,
      ...props,
    }

    return (
      <Styled.Label {...actualProps}>
        <Styled.Input ref={getRef} {...inputProps} />
      </Styled.Label>
    )
  }
}
