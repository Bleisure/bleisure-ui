import React from 'react'
import styled, { css, CSSProperties } from 'styled-components'
import { Sizes } from '../../../assets/styles/sizes'
import { Accents, Colors } from '../../../assets/styles/colors'
import { __Colors, __Sizes } from '../../../assets/styles/types'
import { __Props } from '../../../types/props'

/**
 * @description A parent must be relative
 */
export namespace Substrate {
  export namespace Props {
    interface Optional extends __Props.Optional {}

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {
      readonly color: keyof __Colors
    }

    export interface Actual extends Default, Required, Optional {}

    export interface Props extends Partial<Default>, Required, Optional {}
  }

  export const defaultProps: Props.Default = {
    size: 'base',
    color: 'primary',
  }

  export const Component = ({ children, ...props }: Props.Props) => (
    <Div {...{ ...defaultProps, ...props }} />
  )

  const Div = styled.div.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
      !['color', 'size'].includes(prop) && defaultValidatorFn(prop),
  })<Props.Actual>(({ color, size }) => ({
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    borderRadius: 15 * Sizes[size],
    backgroundColor: Colors[color],
    transition: 'all 0.1s ease-in-out',
    borderWidth: 2 * Sizes[size],
    borderColor: 'transparent',
    borderStyle: 'solid',
    overflow: 'hidden',
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
      export const Basic = css<Props.Actual>(({ size, color }) => ({
        boxShadow: `0 0 ${50 * Sizes[size]}px -${18 * Sizes[size]}px ${
          Colors[color]
        }`,
        [`&:hover ${Div}`]: {
          boxShadow: `0 0 ${42 * Sizes[size]}px -${12 * Sizes[size]}px ${
            Colors[color]
          }`,
        },
        [`&:active ${Div}`]: {
          boxShadow: `0 0 ${40 * Sizes[size]}px -${15 * Sizes[size]}px ${
            Colors[color]
          }`,
          filter: 'brightness(1.05)',
          transform: 'scale(0.99)',
          backfaceVisibility: 'hidden',
        },
      }))
    }

    export namespace Reactions {
      export const Focus = css<Props.Actual>(({ size, color }) => ({
        [`&:focus-within ${Div}`]: {
          borderColor: `${Colors[Accents[color]]}`,
          boxShadow: `0 0 ${40 * Sizes[size]}px -${15 * Sizes[size]}px ${
            Colors[Accents[color]]
          }11`,
        },
      }))

      export const KeyPress = css<Props.Actual>(({ color }) => ({
        [`${Div}::after`]: {
          backgroundColor: `${Colors[Accents[color]]}22`,
          transition: '0s',
        },
      }))

      export const Matching = (properties: CSSProperties) =>
        css<Props.Actual>(({ color }) => {
          return {
            [`${Div}::after`]: {
              opacity: 0,
              ...properties,
              backgroundColor: Colors[Accents[color]],
              transition: '0.3s',
              visibility: 'visible',
            },
          }
        })
    }
  }
}
