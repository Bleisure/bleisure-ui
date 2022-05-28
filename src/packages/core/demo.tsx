import React from 'react'
import styled from 'styled-components'
import Colour from '../../design/colours'
import * as P from '../../types/props'
import { Substrate } from './Substrate'

namespace Demo {
  export const ComponentName = 'Demo'

  type PartialProps = Partial<{
    height: number
  }> &
    P.HasChildren

  export interface DefaultProps {
    width: number | string
  }

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {}

  export type ActualProps = P.Override<PropTypes, DefaultProps>

  export const defaultProps: DefaultProps = {
    width: '50%',
  }

  export const Component = ({ children, ...props }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <StyledDemo {...actualProps}>
        <Substrate.Component colour={Colour.BACKGROUND} />
        {children}
      </StyledDemo>
    )
  }

  Component.displayName = ComponentName

  interface StyledDemoProps extends ActualProps {}

  const StyledDemo = styled.div<StyledDemoProps>(({ width, height }) => ({
    display: 'block',
    position: 'relative',
    width,
    height,
  }))
}

export default Demo.Component
