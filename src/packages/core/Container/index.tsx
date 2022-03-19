import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../design/types'
import { Spacer } from '../Spacer'
import * as P from '../../../types/props'

export namespace Container {
  type DimensionType = { [key in 'x' | 'y' | 'z']?: ReactNode }

  export namespace Props {
    type Required = P.Required

    type Optional = P.Optional<{
      before?: DimensionType
      after?: DimensionType
    }>

    type Default = P.Default

    export type Actual = P.Actual<Required, Default>

    export interface Props extends P.PropTypes<Required, Optional, Default>, Spacer.Props.Props {}

    export const defaultProps: Default = {
      size: 'base',
    }

    // TODO как проверить что все проперти указаны
    export const createScope = <T extends Props>(props: T): { [K in keyof Props]: Props[K] } => {
      const { after, before, children, size, space, spaceDirection } = props
      return {
        after,
        before,
        children,
        size,
        space,
        spaceDirection,
      }
    }
  }

  export const Component = ({ before, after, children, ...props }: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    return (
      <Wrapper {...actualProps}>
        {before?.z}
        {before?.y}
        {before?.y && <Spacer.Component {...actualProps} spaceDirection="y" />}
        <Row {...actualProps}>
          {before?.x}
          {before?.x && <Spacer.Component {...actualProps} spaceDirection="x" />}
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
