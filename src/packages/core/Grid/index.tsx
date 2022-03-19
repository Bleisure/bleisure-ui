import React from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../design/types'
import { styledComponentConfig } from '../../GlobalStyleConfig'
import { Merge } from '../../../types'

export namespace Grid {
  export namespace Container {
    export namespace Props {
      export type Optional = P.Optional<{
        gap: number
      }>

      type Required = P.Required<{
        columns: number
      }>

      type Default = P.Default

      export type Actual = P.Actual<Required, Default>

      export interface Props extends P.PropTypes<Required, Optional, Default> {}

      export const defaultProps: Default = {
        size: 'base',
      }
    }

    export const Component = ({ children, ...props }: Props.Props) => {
      const actualProps = {
        ...Props.defaultProps,
        ...props,
      }

      return <Styled {...actualProps}>{children}</Styled>
    }

    export const Styled = styled.div<Props.Actual & Props.Optional>(({ columns, gap }) => ({
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
    interface Dimension<T> {
      x?: T
      y?: T
    }

    interface DefineArea {
      start: Dimension<number>
      end: Dimension<number>
    }

    type Align = 'start' | 'center' | 'end' | 'stretch'

    interface Alignment {
      align: Dimension<Align>
    }

    export namespace Props {
      export type Optional = P.Optional<Alignment>

      type Required = P.Required

      type Default = P.Default<DefineArea>

      export type Actual = P.Actual<Required, Default>

      export interface Props extends P.PropTypes<Required, Optional, Default> {}

      export const defaultProps: Default = {
        size: 'base',
        start: {},
        end: {},
      }
    }

    export const Component = ({ children, ...props }: Props.Props) => (
      <Styled
        {...{
          ...Props.defaultProps,
          ...props,
        }}
      >
        {children}
      </Styled>
    )

    export const Styled = styled.div.withConfig<Props.Actual>(styledComponentConfig(['end']))<
      Props.Actual & Props.Optional
    >(
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
