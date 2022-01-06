import React from 'react'
import { Meta } from '@storybook/react'
import { Image } from '.'
import { Substrate } from '../Substrate'

export default {
  title: 'Core/Image',
  component: Image.Component,
  args: {
    srcSet: {
      landscape: {
        small:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Color_icon_yellow.svg/1024px-Color_icon_yellow.svg.png',
        medium:
          'https://upload.wikimedia.org/wikipedia/commons/3/37/Color_icon_red.png',
        large:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Color_icon_green.svg/2048px-Color_icon_green.svg.png',
      },
    },
  } as Image.Props.Props,
} as Meta

export const Example = (args: Image.Props.Props) => (
  <div style={{ width: 100 }}>
    <Image.Component {...args} />
  </div>
)
