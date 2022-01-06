import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { __Colors, __Sizes } from '../../../assets/styles/types'
import { __Props } from '../../../types/props'
import { styledComponentConfig } from '../../GlobalStyleConfig'
import { Shape } from '../Shape'

export namespace Icon {
  export namespace Props {
    interface Optional extends __Props.Optional {
      iconProps?: HTMLAttributes<HTMLEmbedElement>
    }

    interface Required extends __Props.Required {
      src: string
    }

    export interface Default extends __Props.Default {
      readonly color: keyof __Colors
    }

    export interface Actual extends Default, Required, Optional {}

    export interface Props
      extends Partial<Default>,
        Required,
        Optional,
        // Injected components
        Shape.Props.Props {}
  }

  export const defaultProps: Props.Default = {
    color: 'primary',
    size: 'base',
  }

  export const Component = ({ iconProps, ...props }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    return (
      <Shape.Component {...actualProps} {...{ shape: 'square' }}>
        <Embed {...{ ...iconProps, ...actualProps }} type="image/svg+xml" />
      </Shape.Component>
    )
  }

  const Embed = styled.embed.withConfig<Props.Actual>(styledComponentConfig())(
    ({ size }) => ({
      // verticalAlign: 'middle',
      // display: 'inline-block',
    }),
  )
}
