import React, { useEffect, useRef, useState } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../design/types'
import { Sizes } from '../../../design/sizes'

export namespace Shape {
  type ShapeType = 'circle' | 'square'

  export namespace Props {
    export type Optional = P.Optional<{
      ignorePaddings: boolean
      height: number
    }>

    type Required = P.Required<{
      width: number
    }>

    type Default = P.Default<{
      shape: ShapeType
    }>

    export type Actual = P.Actual<Required, Default>

    export interface Props extends P.PropTypes<Required, Optional, Default> {}

    export const defaultProps: Default = {
      size: 'base',
      shape: 'circle',
    }
  }

  export const Component = ({ children, ...props }: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    return (
      <Styled {...{ ...actualProps }}>
        <Alignment>{children}</Alignment>
      </Styled>
    )
  }

  const Styled = styled.div<Props.Actual & Props.Optional>(
    ({ shape, width, height = width, size }) => ({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: shape === 'circle' ? '50%' : 0,
      width: width * Sizes[size],
      height: height * Sizes[size],
      overflow: 'hidden',
      transition: '0.3s cubic-bezier(.5,.45,.17,1)',
    }),
  )

  // TODO надо ли это??
  const Alignment = styled.div(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    '& > *': {
      height: '100%',
      width: '100%',
      transition: 'opacity 0.3s',
    },
  }))
}
