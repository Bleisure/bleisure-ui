import React from 'react'
import { Meta } from '@storybook/react'
import { Input } from '.'

export default {
  title: 'Core/Input',
  component: Input.Component,
  args: Input.Props.defaultProps,
} as Meta

export const Example = (args: Input.Props.Props) => <Input.Component {...args} />
