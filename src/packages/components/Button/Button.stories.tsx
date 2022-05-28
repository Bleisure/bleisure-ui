import React from 'react'
import { Meta } from '@storybook/react'
// import EventIcon from '../../../assets/icons/create-event.svg'
// import { Icon } from '../../core/Icon'
import { Button } from '.'
import Demo from '../../core/demo'

export default {
  title: 'Components/Button',
  component: Button.Component,
  args: Button.defaultProps,
} as Meta<Button.PropTypes>

export const Example = (args: Button.PropTypes) => (
  <Demo width={300}>
    <Button.Component {...args}>Создать событие</Button.Component>
  </Demo>
)
