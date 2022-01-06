import React, { ReactNode } from 'react'
import { __Props } from '../../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../assets/styles/types'
import { Spacer } from '../Spacer'
import { Text } from '../Text'

export namespace Grid {
  export namespace Props {
    interface Optional extends __Props.Optional {}

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {}

    export interface Actual extends Default, Required, Optional {}

    export interface Props extends Partial<Default>, Required, Optional {}
  }

  const defaultProps: Props.Default = {
    size: 'base',
  }

  export const Component = ({ children, ...props }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <Wrapper {...actualProps}>
        <_GridRow {...actualProps}>
          <Text.Component>1</Text.Component>
        </_GridRow>
        <GridRow {...actualProps}>
          <Text.Component>2</Text.Component>
        </GridRow>
        <_GridRow {...actualProps}>
          <Text.Component>3</Text.Component>
        </_GridRow>
        <GridRow {...actualProps}>
          <Text.Component>4</Text.Component>
        </GridRow>
        <_GridRow {...actualProps}>
          <Text.Component>5</Text.Component>
        </_GridRow>
      </Wrapper>
    )
  }

  const Wrapper = styled.div<Props.Actual>(({}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
  }))

  const GridRow = styled.div<Props.Actual>(({}) => ({
    backgroundColor: 'blue',
    width: 10,
  }))
  
  const _GridRow = styled.div<Props.Actual>(({}) => ({
    backgroundColor: 'red',
    width: 20,
  }))
}
