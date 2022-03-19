import React from 'react'
import styled from 'styled-components'
import { Sizes } from '../../../design/sizes'
import { __Sizes } from '../../../design/types'
import * as P from '../../../types/props'

export namespace Spacer {
  export namespace Props {
    export type Optional = P.Optional<{
      /**
       * @description "null" !== null, so the !(spaceDirection = null) returns false
       */
      spaceDirection: 'x' | 'y' | 'null'
    }>

    type Required = P.Required

    type Default = P.Default<{
      space: number
    }>

    export type Actual = P.Actual<Required, Default>

    export type Props = P.PropTypes<Required, Optional, Default>

    export const defaultProps: Default = {
      size: 'base',
      space: 20,
    }
  }

  export const Component = (props: Props.Props) => (
    <Styled {...{ ...Props.defaultProps, ...props }} />
  )

  export const Styled = styled.span<Props.Actual & Props.Optional>(
    () => ({
      display: 'block',
      position: 'relative',
      // TODO: Create default list (what each css component consist of?)
      // And import here
      boxSizing: 'border-box',
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
