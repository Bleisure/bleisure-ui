import React from 'react'
import { Meta } from '@storybook/react'

import EventIcon from '../../../assets/icons/create-event.svg'
import { Icon } from '.'

export default {
  title: 'Core/Icon',
  component: Icon.Component,
  args: Icon.defaultProps,
} as Meta

export const Example = (args: Icon.PropTypes) => (
  <div style={{ height: 200, width: 100 }}>
    <Icon.Component src={EventIcon} {...args} />
  </div>
)
