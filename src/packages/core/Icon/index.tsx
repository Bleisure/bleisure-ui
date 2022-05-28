import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import Colour from '../../../design/colours'
import Scale from '../../../design/scale'
import * as P from '../../../types/props'
import { styledComponentConfig } from '../../GlobalStyleConfig'
import { Shape } from '../Shape'

export namespace Icon {
  export const ComponentName = 'Icon'

  type PartialProps = Partial<{
    iconProps?: HTMLAttributes<HTMLEmbedElement>
  }>

  interface DefaultProps extends Colour.Property, Scale.Property {}

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {
    src: string
    [Shape.ComponentName]: Shape.PropTypes
  }

  export type ActualProps = P.Exclude<
    P.Override<PropTypes, DefaultProps>,
    'iconProps' | typeof Shape.ComponentName
  >

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
    colour: Colour.PRIMARY,
  }

  export const Component = ({ Shape: shapeProps, iconProps, ...props }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    const { scale } = actualProps

    return (
      <Shape.Component scale={scale} shapeType="square" {...shapeProps}>
        {/* TODO: add iconProps to Embed */}
        <Embed {...{ ...actualProps }} type="image/svg+xml" />
      </Shape.Component>
    )
  }

  Component.displayName = ComponentName

  const Embed = styled.embed.withConfig(styledComponentConfig([]))({
    // verticalAlign: 'middle',
    // display: 'inline-block',
  })
}
