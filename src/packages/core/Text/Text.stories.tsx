import React from 'react'
import { Meta } from '@storybook/react'

import { Text } from '.'

export default {
  title: 'Core/Text',
  component: Text.Component,
  args: Text.Props.defaultProps,
} as Meta

export const Example = (args: Text.Props.Props) => <Text.Component {...args}>Text</Text.Component>
