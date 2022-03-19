import React from 'react'
import styled from 'styled-components'
import EventIcon from '../../../assets/icons/create-event.svg'
import { Meta } from '@storybook/react'
import { Text } from '../Text'
import { Substrate } from '.'
import { Icon } from '../Icon'
import { Contrasts } from '../../../assets/styles/colors'

export default {
  title: 'Core/Substrate',
  component: Substrate.Component,
  description: "Parent must hold it's position relative (relative parent contains this substrate)",
  args: Substrate.Props.defaultProps,
} as Meta

export const TextOnSubstrait = (args: Substrate.Props.Props) => (
  <AnyRelativeParent>
    <Substrate.Component {...args} />
    <Text.Component
      color={Contrasts[args.color]}
      fontSize="h2"
    >{`Here is a text upside ${args.color}-color substrait`}</Text.Component>
  </AnyRelativeParent>
)

export const IconOnSubstrait = (args: Substrate.Props.Props) => (
  <AnyRelativeParent>
    <Substrate.Component color="foreground" corners="smooth" {...args} />
    <Icon.Component src={EventIcon} {...args} />
  </AnyRelativeParent>
)

const AnyRelativeParent = styled.div({
  position: 'relative', // Important
  display: 'inline-block',
  padding: 20, // Important
})
