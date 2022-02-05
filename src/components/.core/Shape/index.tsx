import React, { useEffect, useRef, useState } from 'react'
import { __Props } from '../../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../assets/styles/types'
import { Sizes } from '../../../assets/styles/sizes'

export namespace Shape {
  type ShapeType = 'circle' | 'square'

  export namespace Props {
    interface Optional extends __Props.Optional {
      ignorePaddings?: boolean
    }

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {
      shape: ShapeType
    }

    export interface Actual extends Default, Required, Optional {}

    export interface Props extends Partial<Default>, Required, Optional {}
  }

  namespace State {
    export interface Dimensions {
      width: number
      height: number
    }

    export const initialDimensionsState: Dimensions = {
      width: 0,
      height: 0,
    }
  }

  export const defaultProps: Props.Default = {
    size: 'base',
    shape: 'circle',
  }

  export const Component = ({ children, ...props }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }
    const [dimensions, setDimensions] = useState<State.Dimensions>(
      State.initialDimensionsState,
    )
    const reference = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (reference.current) {
        const _dimensions = getSizeByType(
          actualProps.shape,
          reference.current,
          actualProps,
        )
        setDimensions(_dimensions)
      }
    }, [reference.current]) // actualProps.shape

    return (
      <Styled ref={reference} {...{ ...actualProps, ...dimensions }}>
        <Alignment {...dimensions}>{children}</Alignment>
      </Styled>
    )
  }

  const Styled = styled.div<Props.Actual & State.Dimensions>(
    ({ shape, width, height, size }) => ({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: shape === 'circle' ? '50%' : 0,
      width: width * Sizes[size],
      height: height * Sizes[size],
      // left: !height ? '50%' : '0', // TODO: Make effects for account box
      // top: !height ? '50%' : '0',
      overflow: 'hidden',
      transition: '0.3s cubic-bezier(.5,.45,.17,1)',
    }),
  )

  const Alignment = styled.div<State.Dimensions>(({ height }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    '& > *': {
      height: '100%',
      width: '100%',
      opacity: height ? 1 : 0,
      transition: 'opacity 0.3s',
    },
  }))

  function getSizeByType(
    type: ShapeType,
    element: HTMLDivElement,
    { ignorePaddings }: Partial<Props.Props>,
  ): State.Dimensions {
    const parent = element.parentElement
    if (!parent) {
      return State.initialDimensionsState
    }

    const computedStyle = getComputedStyle(parent)

    let height = parent.offsetHeight
    let width = parent.offsetWidth

    if (!ignorePaddings) {
      height -=
        parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom)
      width -=
        parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight)
    }

    switch (type) {
      case 'circle':
      case 'square': {
        const size = Math.min(height, width)
        return {
          width: size,
          height: size,
        }
      }
      default:
        return State.initialDimensionsState
    }
  }
}
