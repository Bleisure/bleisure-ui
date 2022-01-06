import React from 'react'
import { Meta } from '@storybook/react'

import { Text } from '.'

export default {
  title: 'Core/Text',
  component: Text.Component,
  args: {
    color: 'main',
    fontFamily: 'main',
    fontWeight: 'bold',
    fontSize: 'h2',
    size: 'base',
  } as Text.Props.Props,
} as Meta

export const Example = (args: Text.Props.Props) => (
  <Text.Component {...args}>Text</Text.Component>
)
