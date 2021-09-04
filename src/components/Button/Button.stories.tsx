import React from 'react'
import { Meta } from '@storybook/react'

import Button from '.'
import { ButtonProps } from './view'

import EventIcon from '../../assets/icons/create-event.svg'
import Icon from '../Icon'
import { Styled } from '../GlobalStyleConfig'

export default {
  title: 'Button',
  component: Button,
} as Meta

export const Primary = (args: ButtonProps) => (
  <Button color="primary" after={<Icon src={EventIcon} />} {...args}>
    Создать событие
  </Button>
)

export const Secondary = (args: ButtonProps) => (
  <Button color="secondary" {...args}>
    Secondary
  </Button>
)
