import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Spacer } from '../Spacer'
import * as P from '../../../types/props'
import Scale from '../../../design/scale'

export namespace Container {
  export const ComponentName = 'Container'

  type DimensionType = { [key in 'x' | 'y' | 'z']?: ReactNode }

  type PartialProps = Partial<{
    before: DimensionType
    after: DimensionType
    [Spacer.ComponentName]: Spacer.PropTypes
  }> &
    P.HasChildren

  export interface DefaultProps extends Scale.Property {}

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {}

  export type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'Spacer'>

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
  }

  export const Component = ({
    Spacer: spacerProps,
    before,
    after,
    children,
    ...props
  }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <Wrapper>
        {before?.z}
        {before?.y}
        {before?.y && <Spacer.Component spaceDirection="y" {...spacerProps} />}
        <Row>
          {before?.x}
          {before?.x && <Spacer.Component spaceDirection="x" {...spacerProps} />}
          {children}
          {after?.x && <Spacer.Component spaceDirection="x" {...spacerProps} />}
          {after?.x}
        </Row>
        {after?.y && <Spacer.Component spaceDirection="y" {...spacerProps} />}
        {after?.y}
        {after?.z}
      </Wrapper>
    )
  }

  Component.displayName = ComponentName

  const Wrapper = styled.div(({}) => ({}))
  const Row = styled.div(({}) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    '> *': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  }))

  // const Left = styled.span({
  //   verticalAlign: 'middle', // TODO: editable
  // })
  // const Right = styled.span({
  //   verticalAlign: 'middle', // TODO: editable
  // })
  // const Top = styled.span({})
  // const Bottom = styled.span({})
  // const Front = styled.span({})
  // const Back = styled.span({})
}
