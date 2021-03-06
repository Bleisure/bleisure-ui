import React from 'react'
import { Meta } from '@storybook/react'
import { Input } from '.'

export default {
  title: 'Core/Input',
  component: Input.Component,
  args: Input.defaultProps,
} as Meta

export const Example = (args: Input.PropTypes) => <Input.Component {...args} />
