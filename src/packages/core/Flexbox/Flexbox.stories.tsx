import React from 'react'
import { Meta } from '@storybook/react'
import { Flexbox } from '.'

export default {
  title: 'Core/Flexbox',
  component: Flexbox.Component,
  args: {} as Flexbox.Props.Props,
} as Meta

export const Example = (args: Flexbox.Props.Props) => (
  <Flexbox.Component {...args}></Flexbox.Component>
)
