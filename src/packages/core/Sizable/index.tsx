import React from 'react'
import styled from 'styled-components'
import { SizeKey, Sizes } from '../../../design/sizes'
import * as P from '../../../types/props'

export namespace Sizable {
  type DefaultProps = {
    size: SizeKey
  }

  export const defaultProps: DefaultProps = {
    size: 'base',
  }

  export type Props = P.PropTypes<DefaultProps, {}, {}>

  export const Component = (props: Props) => <Styled {...{ ...defaultProps, ...props }} />

  interface StyledProps extends DefaultProps {}

  export const Styled = styled.span<StyledProps>(({ size }) => ({}))
}
