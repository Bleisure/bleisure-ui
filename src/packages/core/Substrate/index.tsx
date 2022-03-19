import React from 'react'
import styled, { css, CSSProperties } from 'styled-components'
import { Sizes } from '../../../design/sizes'
import { Accents, Colors, Contrasts } from '../../../design/colors'
import { __Colors, __Sizes } from '../../../design/types'
import { Background } from '../Background'
import * as P from '../../../types/props'

/**
 * @description A parent must be relative
 */
export namespace Substrate {
  type Corners = 'smooth' | 'strong'

  export namespace Props {
    export type Optional = P.Optional<{
      corners: Corners
    }>

    type Required = P.Required

    type Default = P.Default<P.HasColor>

    export type Actual = P.Actual<Required, Default>

    export interface Props extends P.PropTypes<Required, Optional, Default> {}

    export const defaultProps: Default = {
      size: 'base',
      color: 'primary',
    }
  }

  export const Component = (props: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }
    return <Div {...actualProps} />
  }

  const Div = styled.div.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
      !['color', 'size'].includes(prop) && defaultValidatorFn(prop),
  })<Props.Actual & Props.Optional>(({ corners, size, color }) => ({
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    borderRadius: corners === 'smooth' ? 15 * Sizes[size] : 0,
    transition: 'all 0.1s ease-in-out',
    borderWidth: 2 * Sizes[size],
    backgroundColor: Colors[color],
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
      export const Basic = css<Props.Actual>(({ size, color }) => ({
        [Div]: {
          boxShadow: `0 0 ${46 * Sizes[size]}px -${18 * Sizes[size]}px ${Colors[color]}`,
        },
        [`&:hover ${Div}`]: {
          boxShadow: `0 0 ${40 * Sizes[size]}px -${12 * Sizes[size]}px ${Colors[color]}`,
        },
        [`&:active ${Div}`]: {
          boxShadow: `0 0 ${36 * Sizes[size]}px -${15 * Sizes[size]}px ${Colors[color]}`,
          filter: 'brightness(1.05)',
          transform: 'scale(0.99)',
          backfaceVisibility: 'hidden',
        },
      }))
    }

    // TODO: replace this reactions to component that triggers them
    export namespace Reactions {
      export const Focus = css<Props.Actual>(({ size, color }) => ({
        [`&:focus-within ${Div}`]: {
          borderColor: `${Colors[Accents[color]]}`,
          boxShadow: `0 0 ${40 * Sizes[size]}px -${15 * Sizes[size]}px ${Colors[Accents[color]]}11`,
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
