import React from 'react'
import styled from 'styled-components'
import Scale from '../../../design/scale'
import * as P from '../../../types/props'

export namespace Spacer {
  export const ComponentName = 'Spacer'

  type PartialProps = Partial<{
    /**
     * @description "null" !== null, so the !(spaceDirection = null) returns false
     */
    spaceDirection: 'x' | 'y' | 'null'
  }>

  export type DefaultProps = Scale.Property & {
    space: number
  }

  export interface PropTypes extends Partial<DefaultProps>, PartialProps, P.HasChildren {}

  type ActualProps = P.Override<PropTypes, DefaultProps>

  export const defaultProps: DefaultProps = {
    space: 20,
    scale: Scale.BASE,
  }

  export const Component = (props: Readonly<PropTypes>) => (
    <Styled {...{ ...defaultProps, ...props }} />
  )

  Component.displayName = ComponentName

  interface StyledProps extends ActualProps {}

  export const Styled = styled.span<StyledProps>(
    () => ({
      display: 'block',
      position: 'relative',
      // TODO: Create default list (what each css component consist of?)
      // And import here
      boxSizing: 'border-box',
    }),
    ({ space, scale, spaceDirection }) =>
      !spaceDirection && {
        padding: space * Scale.get[scale],
      },
    ({ space, scale, spaceDirection }) =>
      spaceDirection === 'y' && {
        paddingTop: space * Scale.get[scale],
        paddingBottom: space * Scale.get[scale],
      },
    ({ space, scale, spaceDirection }) =>
      spaceDirection === 'x' && {
        paddingLeft: space * Scale.get[scale],
        paddingRight: space * Scale.get[scale],
      },
  )
}
