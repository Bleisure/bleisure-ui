import React from 'react'
import styled from 'styled-components'
import { Sizes } from '../../../assets/styles/sizes'
import { __Sizes } from '../../../assets/styles/types'
import { __Props } from '../../../types/props'

export namespace Spacer {
  export namespace Props {
    interface Optional extends __Props.Optional {
      spaceDirection?: 'x' | 'y' | 'null'
    }

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {
      space: number
    }

    export interface Actual extends Default, Required, Optional {}

    export interface Props extends Partial<Default>, Required, Optional {}
  }

  export const defaultProps: Props.Default = {
    size: 'base',
    space: 20,
  }

  export const Component = (props: Props.Props) => (
    <StyledSpacer {...{ ...defaultProps, ...props }} />
  )

  const StyledSpacer = styled.span<Props.Actual>(
    () => ({
      display: 'block',
      position: 'relative',
    }),
    ({ space, size, spaceDirection }) =>
      !spaceDirection && {
        padding: space * Sizes[size],
      },
    ({ space, size, spaceDirection }) =>
      spaceDirection === 'y' && {
        paddingTop: space * Sizes[size],
        paddingBottom: space * Sizes[size],
      },
    ({ space, size, spaceDirection }) =>
      spaceDirection === 'x' && {
        paddingLeft: space * Sizes[size],
        paddingRight: space * Sizes[size],
      },
  )
}
