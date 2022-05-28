import React from 'react'
import { Meta } from '@storybook/react'
import { Flexbox } from '.'

export default {
  title: 'Core/Flexbox',
  component: Flexbox.Component,
  args: {} as Flexbox.PropTypes,
} as Meta

export const Example = (args: Flexbox.PropTypes) => (
  <Flexbox.Component {...args}></Flexbox.Component>
)
