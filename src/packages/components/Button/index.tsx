import React, { HTMLAttributes } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { Contrasts } from '../../../design/colors'
import { __Colors, __Fonts, __Sizes } from '../../../design/types'
import { FontSizes } from '../../../design/fonts'
import { Sizes } from '../../../design/sizes'
import { Container } from '../../core/Container'
import { Substrate } from '../../core/Substrate'
import { Text } from '../../core/Text'
import { Spacer } from '../../core/Spacer'

export namespace Button {
  export namespace Props {
    type Optional = P.Optional<{
      buttonProps: HTMLAttributes<HTMLButtonElement>
    }>

    type Required = P.Required

    type Default = P.Default

    export type Actual = P.Actual<Required, Default>

    export interface Props
      extends P.PropTypes<Required, Optional, Default>,
        Container.Props.Props,
        Substrate.Props.Props,
        Text.Props.Props {}

    export const defaultProps: Default = {
      size: 'base',
    }
  }

  /**
   * @param children - Text only
   */
  export const Component = ({
    children,
    buttonProps,
    after,
    space,
    spaceDirection,
    ...props
  }: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    const containerProps = Container.Props.createScope(actualProps)

    // TODO: сделать иконку соразмерно кнопке

    return (
      <Button {...{ ...buttonProps, ...actualProps }}>
        <Substrate.Component corners="smooth" {...actualProps} />
        {/* TODO: make grid */}
        <Container.Component {...actualProps}>
          <Spacer.Component {...actualProps} spaceDirection="y">
            <Text.Component {...actualProps} color={Contrasts[actualProps.color]}>
              {children}
            </Text.Component>
          </Spacer.Component>
        </Container.Component>
      </Button>
    )
  }

  const Button = styled.button<Props.Actual>(
    ({}) => Substrate.Styled.Effects.Basic,
    ({ size }) => ({
      display: 'block',
      width: '100%',
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      paddingLeft: FontSizes.h2 * Sizes[size],
      paddingRight: FontSizes.h2 * Sizes[size],
      transition: '0.2s ease-in-out',
      whiteSpace: 'nowrap',
    }),
  )
}

export default Button.Component
