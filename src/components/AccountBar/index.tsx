import React from 'react'
import { __Props } from '../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../assets/styles/types'
import { FontSizes } from '../../assets/styles/fonts'
import { Sizes } from '../../assets/styles/sizes'
import { Substrate } from '../.core/Substrate'
import { Text } from '../.core/Text'
import { Image } from '../.core/Image'
import { Shape } from '../.core/Shape'
import { Spacer } from '../.core/Spacer'
import { Contrasts } from '../../assets/styles/colors'

export namespace AccountBar {
  export namespace Props {
    interface Optional extends __Props.Optional {
      image?: string
    }

    interface Required extends __Props.Required {}

    export interface Default extends Text.Props.Default {}

    export interface Actual extends Default, Required, Optional {}

    export interface Props
      extends Partial<Default>,
        Required,
        Optional,
        // Inner component types
        Substrate.Props.Props,
        Image.Props.Props,
        Shape.Props.Props,
        Spacer.Props.Props,
        Text.Props.Props {}
  }

  export const defaultProps: Props.Default = {
    ...Text.defaultProps,
    ...Shape.defaultProps,
    color: 'input',
    fontSize: 'h2',
    fontWeight: 'bold',
  }

  export const Component = ({ children, srcSet, ...props }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <Wrapper {...actualProps}>
        <Substrate.Component {...actualProps} />
        <Shape.Component {...actualProps}>
          <Image.Component srcSet={srcSet} {...actualProps} />
        </Shape.Component>
        <Spacer.Component {...actualProps} spaceDirection="x" />
        {/* TODO: size может меняться */}
        <Spacer.Component {...actualProps} size="s" spaceDirection="y">
          <Text.Component {...actualProps} color={Contrasts[actualProps.color]}>
            {children}
          </Text.Component>
        </Spacer.Component>
      </Wrapper>
    )
  }

  const Wrapper = styled.div<Props.Actual>(
    () => Substrate.Styled.Effects.Basic,
    ({ fontSize, size }) => ({
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      background: 'transparent',
      paddingTop: FontSizes[fontSize] * Sizes[size] * 0.75,
      paddingBottom: FontSizes[fontSize] * Sizes[size] * 0.75,
      paddingLeft: FontSizes[fontSize] * Sizes[size],
      paddingRight: FontSizes[fontSize] * Sizes[size],
      '& > *': {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }),
  )

  const After = styled.button({})
}
