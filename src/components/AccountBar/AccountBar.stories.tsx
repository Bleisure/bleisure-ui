import React from 'react'
import { Meta } from '@storybook/react'
import { AccountBar } from '.'

export default {
  title: 'Components/AccountBar',
  component: AccountBar.Component,
  args: {
    ...AccountBar.defaultProps,
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
  } as AccountBar.Props.Props,
} as Meta

export const Example = (args: AccountBar.Props.Props) => (
  <AccountBar.Component {...args}>Константин</AccountBar.Component>
)
