import React from 'react'
import styled from 'styled-components'
import * as P from '../../../types/props'

export namespace Flexbox {
  export namespace Props {
    type Optional = P.Optional

    type Required = P.Required

    type Default = P.Default

    export type Actual = P.Actual<Required, Default>

    export type Props = P.PropTypes<Required, Optional, Default>

    export const defaultProps: Default = {
      size: 'base',
    }
  }

  // export const Item = ({ children }) => {
  //   return <FlexItem>{children}</FlexItem>
  // }

  export const Component = ({ children, ...props }: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    return <Flexbox {...actualProps}>{children}</Flexbox>
  }

  const Flexbox = styled.div<Props.Actual>(({}) => ({
    display: 'flex',
    boxSizing: 'border-box',
    // TODO
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'stretch',
    height: '100%',
    padding: '0 70px',
  }))
}
