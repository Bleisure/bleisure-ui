import React from 'react'
import { Meta } from '@storybook/react'
import EventIcon from '../../assets/icons/create-event.svg'
import { Icon } from '../.core/Icon'
import { Button } from '.'

export default {
  title: 'Components/Button',
  component: Button.Component,
  args: {
    ...Button.defaultProps,
    size: 'base',
  },
} as Meta<Button.Props.Props>

export const Example = (args: Button.Props.Props) => (
  <Button.Component
    color="primary"
    after={{
      x: <Icon.Component {...args} src={EventIcon} size="m" />,
    }}
    {...args}
  >
    Создать событие
  </Button.Component>
)
