import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import Colour from '../../../design/colours'
import { Fonts, FontSizes, FontWeights, HasTypeOptions } from '../../../design/fonts'
import * as P from '../../../types/props'
export namespace Input {
  export const ComponentName = 'Input'

  type PartialProps = Partial<{
    inputProps: InputHTMLAttributes<HTMLInputElement>
  }>

  export interface DefaultProps extends HasTypeOptions, Colour.Property {}

  export interface PropTypes
    extends Partial<DefaultProps>,
      PartialProps,
      P.HasRef<HTMLInputElement> {}

  export type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'getRef' | 'inputProps'>

  export const defaultProps: DefaultProps = {
    colour: Colour.MAIN,
    fontFamily: 'main',
    fontSize: 'p',
    fontWeight: 'regular',
  }

  export const Component = ({ getRef, inputProps, ...props }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <Styled.Label {...actualProps}>
        <Styled.Input ref={getRef} {...inputProps} />
      </Styled.Label>
    )
  }

  Component.displayName = ComponentName

  namespace Styled {
    export const Input = styled.input(({}) => ({
      border: 'none',
      background: 'transparent',
      outline: 'none',
      alignSelf: 'center',
      width: '100%',
    }))

    export const Label = styled.label<ActualProps>(
      ({ colour, fontFamily, fontSize, fontWeight }) => ({
        width: '100%',
        height: '100%',
        display: 'grid',
        '& > input': {
          color: Colour.pallete[colour],
          fontFamily: Fonts[fontFamily],
          fontSize: FontSizes[fontSize],
          fontWeight: FontWeights[fontWeight],
        },
      }),
    )
  }
}
