import React from 'react'
import styled from 'styled-components'
import * as P from '../../../types/props'

export namespace Flexbox {
  export const ComponentName = 'Flexbox'

  type PartialProps = P.HasChildren

  export interface PropTypes extends PartialProps {}

  export interface ActualProps extends P.Exclude<PropTypes, 'children'> {}

  export const Component = ({ children, ...props }: PropTypes) => {
    const actualProps: ActualProps = props

    return <StyledFlexbox {...actualProps}>{children}</StyledFlexbox>
  }

  Component.displayName = ComponentName

  const StyledFlexbox = styled.div({
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'stretch',
    height: '100%',
    padding: '0 70px',
  })
}
