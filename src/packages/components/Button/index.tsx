import React, { HTMLAttributes } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import Colour from '../../../design/colours'
import { FontSizes } from '../../../design/fonts'
import Scale from '../../../design/scale'
import { Container } from '../../core/Container'
import { Substrate } from '../../core/Substrate'
import { Text } from '../../core/Text'
import { Spacer } from '../../core/Spacer'

export namespace Button {
  export const ComponentName = 'Button'

  type PartialProps = Partial<{
    buttonProps: HTMLAttributes<HTMLButtonElement>
    [Container.ComponentName]: Container.PropTypes
    [Substrate.ComponentName]: Substrate.PropTypes
    [Spacer.ComponentName]: Spacer.PropTypes
    [Text.ComponentName]: Text.PropTypes
  }>

  export interface DefaultProps extends Scale.Property, Colour.Property {}

  export interface PropTypes extends Partial<DefaultProps>, PartialProps, P.HasChildren {}

  export type ActualProps = P.Exclude<
    P.Override<PropTypes, DefaultProps>,
    | 'children'
    | 'buttonProps'
    | typeof Container.ComponentName
    | typeof Substrate.ComponentName
    | typeof Spacer.ComponentName
    | typeof Text.ComponentName
  >

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
    colour: Colour.PRIMARY,
  }

  // TODO: Create packs, like PRIMARY = colour + fontSize + scale + other...

  /**
   * @param children - Text only
   */
  export const Component = ({
    children,
    buttonProps,
    Container: containerProps,
    Substrate: substrateProps,
    Spacer: spacerProps,
    Text: textProps,
    ...props
  }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    const { colour, scale } = actualProps

    // TODO: сделать иконку соразмерно кнопке

    return (
      <StyledButton {...{ scale, colour }}>
        <Substrate.Component
          scale={scale}
          colour={actualProps.colour}
          borderType="smooth"
          {...substrateProps}
        />
        {/* TODO: make grid */}
        <Container.Component scale={scale} {...containerProps}>
          <Spacer.Component scale={scale} spaceDirection="y" {...spacerProps}>
            <Text.Component colour={Colour.contrasts[colour]} fontSize="h3" {...textProps}>
              {children}
            </Text.Component>
          </Spacer.Component>
        </Container.Component>
      </StyledButton>
    )
  }

  Component.displayName = ComponentName

  interface StyledButtonProps extends Scale.Property, Substrate.Styled.Effects.BasicProps {}

  const StyledButton = styled.button<StyledButtonProps>(
    ({}) => Substrate.Styled.Effects.Basic,
    ({ scale }) => ({
      display: 'block',
      width: '100%',
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      paddingLeft: FontSizes.h2 * Scale.get[scale],
      paddingRight: FontSizes.h2 * Scale.get[scale],
      transition: '0.2s ease-in-out',
      whiteSpace: 'nowrap',
    }),
  )
}

export default Button.Component
