import React from 'react'
import styled, { css, CSSProperties } from 'styled-components'
import Colour from '../../../design/colours'
import Scale from '../../../design/scale'
import * as P from '../../../types/props'

/**
 * @description A parent must be relative
 */
export namespace Substrate {
  export const ComponentName = 'Substrate'

  type Corners = 'smooth' | 'strong'

  type PartialProps = Partial<{
    borderType: Corners
  }>

  interface DefaultProps extends Colour.Property, Scale.Property {}

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {}

  type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'borderType'>

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
    colour: Colour.PRIMARY,
  }

  export const Component = (props: Readonly<PropTypes>) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }
    return <StyledDiv {...actualProps} />
  }

  Component.displayName = ComponentName

  interface StyledDivProps extends ActualProps, PartialProps {}

  const StyledDiv = styled.div.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
      !['colour'].includes(prop) && defaultValidatorFn(prop),
  })<StyledDivProps>(({ borderType, colour, scale }) => ({
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    borderRadius: borderType === 'smooth' ? 15 * Scale.get[scale] : 0,
    transition: 'all 0.1s ease-in-out',
    borderWidth: 2 * Scale.get[scale],
    backgroundColor: Colour.pallete[colour],
    borderColor: 'transparent',
    borderStyle: 'solid',
    overflow: 'hidden',
    // TODO: replace this to component that need it (maybe Background will help)
    '::after': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: 'transparent',
      transition: '1s',
    },
  }))

  export namespace Styled {
    export namespace Effects {
      export interface BasicProps extends Scale.Property, Colour.Property {}

      export const Basic = css<BasicProps>(({ scale, colour }) => ({
        [StyledDiv]: {
          boxShadow: `0 0 ${46 * Scale.get[scale]}px -${18 * Scale.get[scale]}px ${
            Colour.pallete[colour]
          }`,
        },
        [`&:hover ${StyledDiv}`]: {
          boxShadow: `0 0 ${40 * Scale.get[scale]}px -${12 * Scale.get[scale]}px ${
            Colour.pallete[colour]
          }`,
        },
        [`&:active ${StyledDiv}`]: {
          boxShadow: `0 0 ${36 * Scale.get[scale]}px -${15 * Scale.get[scale]}px ${
            Colour.pallete[colour]
          }`,
          filter: 'brightness(1.05)',
          transform: 'scale(0.99)',
          backfaceVisibility: 'hidden',
        },
      }))
    }

    // TODO: replace this reactions to component that triggers them
    export namespace Reactions {
      export interface FocusProps extends Scale.Property, Colour.Property {}

      export const Focus = css<ActualProps>(({ scale, colour }) => ({
        [`&:focus-within ${StyledDiv}`]: {
          borderColor: `${Colour.pallete[Colour.accents[colour]]}`,
          boxShadow: `0 0 ${40 * Scale.get[scale]}px -${15 * Scale.get[scale]}px ${
            Colour.pallete[Colour.accents[colour]]
          }11`,
        },
      }))

      export interface KeyPressProps extends Colour.Property {}

      export const KeyPress = css<ActualProps>(({ colour }) => ({
        [`${StyledDiv}::after`]: {
          backgroundColor: `${Colour.pallete[Colour.accents[colour]]}22`,
          transition: '0s',
        },
      }))

      export const Matching = (properties: CSSProperties) =>
        css<ActualProps>(({ colour }) => {
          return {
            [`${StyledDiv}::after`]: {
              opacity: 0,
              // Need to hold opacity there,
              // Other properties would be overwritten.
              ...properties,
              backgroundColor: Colour.pallete[Colour.accents[colour]],
              transition: '0.3s',
              visibility: 'visible',
            },
          }
        })
    }
  }
}
