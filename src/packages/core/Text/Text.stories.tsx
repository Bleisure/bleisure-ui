import React from 'react'
import { Meta } from '@storybook/react'

import { Text } from '.'

export default {
  title: 'Core/Text',
  component: Text.Component,
  args: Text.defaultProps,
} as Meta

export const Example = (args: Text.PropTypes) => <Text.Component {...args}>Text</Text.Component>
