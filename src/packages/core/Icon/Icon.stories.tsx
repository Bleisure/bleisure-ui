import React from 'react'
import { Meta } from '@storybook/react'

import EventIcon from '../../../assets/icons/create-event.svg'
import { Icon } from '.'

export default {
  title: 'Core/Icon',
  component: Icon.Component,
  args: Icon.Props.defaultProps,
} as Meta

export const Example = (args: Icon.Props.Props) => (
  <div style={{ height: 200, width: 100 }}>
    <Icon.Component src={EventIcon} {...args} />
  </div>
)
