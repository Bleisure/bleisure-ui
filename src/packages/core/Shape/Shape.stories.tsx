import React from 'react'
import { Meta } from '@storybook/react'
import { Shape } from '.'
import { Image } from '../Image'
import { Substrate } from '../Substrate'
import Colour from '../../../design/colours'

export default {
  title: 'Core/Shape',
  component: Shape.Component,
  args: {
    ...Shape.defaultProps,
    width: 50,
  } as Shape.PropTypes,
} as Meta

export const Example = (args: Shape.PropTypes) => (
  <div style={{ position: 'relative', display: 'inline-block', padding: 20 }}>
    <Substrate.Component borderType="smooth" colour={Colour.FOREGROUND} />
    <Shape.Component {...args}>
      {/* <Image.Component
        sources={{
          landscape: {
            small:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Color_icon_yellow.svg/1024px-Color_icon_yellow.svg.png',
            medium: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Color_icon_red.png',
            large:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Color_icon_green.svg/2048px-Color_icon_green.svg.png',
          },
        }}
      /> */}
    </Shape.Component>
  </div>
)
