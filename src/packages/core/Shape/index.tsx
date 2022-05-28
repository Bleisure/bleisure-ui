import React, { useMemo } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import Scale from '../../../design/scale'

export namespace Shape {
  export const ComponentName = 'Shape'

  type ShapeType = 'circle' | 'square'

  export interface DefaultProps extends Scale.Property {
    shapeType: ShapeType
  }

  export interface PropTypes extends Partial<DefaultProps>, P.HasChildren {
    width: number
    height?: number
  }

  type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'children'>

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
    shapeType: 'circle',
  }

  export const Component = ({ children, ...props }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    const { scale, shapeType } = actualProps

    const { width, height } = useMemo(() => {
      const { width, height = width } = actualProps

      return {
        width: width * Scale.get[scale],
        height: height * Scale.get[scale],
      }
    }, [scale])

    const borderRadius = useMemo(() => (shapeType === 'circle' ? '50%' : '0'), [shapeType])

    return (
      <Styled {...{ width, height, borderRadius }}>
        <Alignment>{children}</Alignment>
      </Styled>
    )
  }

  Component.displayName = ComponentName

  interface StyledProps {
    width: number
    height: number
    borderRadius: string
  }

  const Styled = styled.div<StyledProps>(({ width, height, borderRadius }) => ({
    display: 'flex',
    position: 'relative',
    width,
    height,
    borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    transition: '0.3s cubic-bezier(.5,.45,.17,1)',
  }))

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
