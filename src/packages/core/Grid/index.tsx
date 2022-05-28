import React from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { styledComponentConfig } from '../../GlobalStyleConfig'
import Scale from '../../../design/scale'

export namespace Grid {
  export namespace Container {
    export const ComponentName = 'GridContainer'
    type PartialProps = Partial<{
      gap: number
    }> &
      P.HasChildren

    export interface DefaultProps extends Scale.Property {}

    export interface PropTypes extends Partial<DefaultProps>, PartialProps {
      columns: number
    }

    export type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'children'>

    export const defaultProps: DefaultProps = {
      scale: Scale.BASE,
    }

    export const Component = ({ children, ...props }: PropTypes) => {
      const actualProps: ActualProps = {
        ...defaultProps,
        ...props,
      }

      return <Styled {...actualProps}>{children}</Styled>
    }

    Component.displayName = ComponentName

    interface StyledProps extends ActualProps {}

    export const Styled = styled.div<StyledProps>(({ columns, gap }) => ({
      display: 'grid',
      position: 'relative',
      width: '100%',
      height: '100%',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      color: 'white',
    }))
  }

  export namespace Item {
    export const ComponentName = 'GridItem'
    interface Dimension<T> {
      x?: T
      y?: T
    }

    interface DefineArea {
      start: Dimension<number>
      end: Dimension<number>
    }

    type Align = 'start' | 'center' | 'end' | 'stretch'

    type PartialProps = Partial<{
      align: Dimension<Align>
    }> &
      P.HasChildren

    export interface DefaultProps extends Scale.Property, DefineArea {}

    export interface PropTypes extends Partial<DefaultProps>, PartialProps {}

    export type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'children'>

    export const defaultProps: DefaultProps = {
      scale: Scale.BASE,
      start: {},
      end: {},
    }

    export const Component = ({ children, ...props }: PropTypes) => (
      <Styled {...defaultProps} {...props}>
        {children}
      </Styled>
    )

    Component.displayName = ComponentName

    interface StyledProps extends ActualProps {}

    export const Styled = styled.div.withConfig<StyledProps>(styledComponentConfig(['end']))(
      ({
        start: { x: gridColumnStart, y: gridRowStart },
        end: { x: gridColumnEnd, y: gridRowEnd },
        align,
      }) => ({
        position: 'relative',
        gridColumnStart,
        gridColumnEnd,
        gridRowStart,
        gridRowEnd,
        justifySelf: align?.x,
        alignSelf: align?.y,
      }),
    )
  }
}
