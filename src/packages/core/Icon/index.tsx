import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { __Colors, __Sizes } from '../../../design/types'
import * as P from '../../../types/props'
import { styledComponentConfig } from '../../GlobalStyleConfig'
import { Shape } from '../Shape'

export namespace Icon {
  export namespace Props {
    type Optional = P.Optional<{
      iconProps?: HTMLAttributes<HTMLEmbedElement>
    }>

    type Required = P.Required<{ src: string }>

    type Default = P.Default<P.HasColor>

    export type Actual = P.Actual<Required, Default>

    export interface Props extends P.PropTypes<Required, Optional, Default>, Shape.Props.Props {}

    export const defaultProps: Default = {
      size: 'base',
      color: 'primary',
    }
  }

  export const Component = ({ iconProps, ...props }: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    return (
      <Shape.Component {...actualProps} {...{ shape: 'square' }}>
        {/* TODO: add iconProps to Embed */}
        <Embed {...{ ...actualProps }} type="image/svg+xml" />
      </Shape.Component>
    )
  }

  const Embed = styled.embed.withConfig<Props.Actual>(styledComponentConfig([]))(({ size }) => ({
    // verticalAlign: 'middle',
    // display: 'inline-block',
  }))
}
