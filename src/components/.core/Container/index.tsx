import React, { ReactNode } from 'react'
import { __Props } from '../../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../assets/styles/types'
import { Spacer } from '../Spacer'

export namespace Container {
  type DimensionType = { [key in 'x' | 'y' | 'z']?: ReactNode }

  export namespace Props {
    interface Optional extends __Props.Optional {
      before?: DimensionType
      after?: DimensionType
    }

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {}

    export interface Actual extends Default, Required, Optional {}

    export interface Props
      extends Partial<Default>,
        Required,
        Optional,
        // Inner components
        Spacer.Props.Props {}
  }

  export const defaultProps: Props.Default = {
    size: 'base',
  }

  export const Component = ({
    before,
    after,
    children,
    ...props
  }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <Wrapper {...actualProps}>
        {before?.z}
        {before?.y}
        {before?.y && <Spacer.Component {...actualProps} spaceDirection="y" />}
        <Row {...actualProps}>
          {before?.x}
          {before?.x && (
            <Spacer.Component {...actualProps} spaceDirection="x" />
          )}
          {children}
          {after?.x && <Spacer.Component {...actualProps} spaceDirection="x" />}
          {after?.x}
        </Row>
        {after?.y && <Spacer.Component {...actualProps} spaceDirection="y" />}
        {after?.y}
        {after?.z}
      </Wrapper>
    )
  }

  const Wrapper = styled.div<Props.Actual>(({}) => ({}))
  const Row = styled.div<Props.Actual>(({}) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    '> *': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  }))

  const Left = styled.span({
    verticalAlign: 'middle', // TODO: editable
  })
  const Right = styled.span({
    verticalAlign: 'middle', // TODO: editable
  })
  const Top = styled.span({})
  const Bottom = styled.span({})
  const Front = styled.span({})
  const Back = styled.span({})
}
