import React, { HTMLAttributes } from 'react'
import { __Props } from '../../types/props'
import styled from 'styled-components'
import { Colors, Contrasts } from '../../assets/styles/colors'
import { __Colors, __Fonts, __Sizes } from '../../assets/styles/types'
import { FontSizes } from '../../assets/styles/fonts'
import { Sizes } from '../../assets/styles/sizes'
import { Container } from '../.core/Container'
import { Substrate } from '../.core/Substrate'
import { Text } from '../.core/Text'
import { Spacer } from '../.core/Spacer'

export namespace Button {
  export namespace Props {
    interface Optional extends __Props.Optional {
      buttonProps?: HTMLAttributes<HTMLButtonElement>
    }

    interface Required extends __Props.Required {}

    export interface Default
      extends __Props.Default,
        Text.Props.Default,
        Substrate.Props.Default,
        Container.Props.Default {
      readonly color: keyof __Colors
    }

    export interface Actual extends Default, Required, Optional {}

    export interface Props
      extends Partial<Default>,
        Required,
        Optional,
        // Inner component types
        Container.Props.Props,
        Substrate.Props.Props,
        Text.Props.Props {}
  }

  export const defaultProps: Props.Default = {
    ...Text.defaultProps,
    ...Substrate.defaultProps,
    ...Container.defaultProps,
    fontSize: 'h2',
    fontWeight: 'bold',
    color: 'primary',
    size: 'base',
  }

  /**
   * @param children - Text only
   */
  export const Component = ({
    children,
    buttonProps,
    ...props
  }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    // TODO: сделать иконку соразмерно кнопке

    return (
      <Button {...{ ...buttonProps, ...actualProps }}>
        <Substrate.Component {...actualProps} />
        <Container.Component {...actualProps}>
          <Spacer.Component {...actualProps} spaceDirection="y">
            {React.Children.map(children, (child) =>
              typeof child === 'string' ? (
                <Text.Component
                  {...actualProps}
                  color={Contrasts[actualProps.color]}
                >
                  {children}
                </Text.Component>
              ) : (
                'Children allows only strings for now'
              ),
            )}
          </Spacer.Component>
        </Container.Component>
      </Button>
    )
  }

  const Button = styled.button<Props.Actual>(
    ({}) => Substrate.Styled.Effects.Basic,
    ({ size }) => ({
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      paddingLeft: FontSizes.h2 * Sizes[size],
      paddingRight: FontSizes.h2 * Sizes[size],
      transition: '0.2s ease-in-out',
    }),
  )
}
