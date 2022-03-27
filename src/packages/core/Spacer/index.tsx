import React from 'react'
import styled from 'styled-components'
import { Sizes } from '../../../design/sizes'
import * as P from '../../../types/props'
import Sizable, { SizableProps } from '../../modifiers/Sizable'

export namespace Spacer {
  export interface OptionalProps {
    /**
     * @description "null" !== null, so the !(spaceDirection = null) returns false
     */
    spaceDirection: 'x' | 'y' | 'null'
  }

  interface DefaultProps {
    space: number
  }

  export interface PropTypes extends DefaultProps, OptionalProps {}

  type ActualProps = P.Override<PropTypes, DefaultProps>

  export const defaultProps: DefaultProps = {
    space: 20,
  }

  export const Component = ({ ...props }: Readonly<PropTypes>) => (
    <Sizable render={(size) => <Styled {...{ ...size, ...defaultProps, ...props }} />} />
  )

  interface StyledProps extends ActualProps, SizableProps {}

  export const Styled = styled.span<StyledProps>(
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
