import React from 'react'
import styled from 'styled-components'
import EventIcon from '../../../assets/icons/create-event.svg'
import { Meta } from '@storybook/react'
import { Text } from '../Text'
import { Substrate } from '.'
import { Icon } from '../Icon'
import Colour from '../../../design/colours'

export default {
  title: 'Core/Substrate',
  component: Substrate.Component,
  description: "Parent must hold it's position relative (relative parent contains this substrate)",
  args: Substrate.defaultProps,
} as Meta

export const TextOnSubstrait = (args: Substrate.PropTypes) => (
  <AnyRelativeParent>
    <Substrate.Component {...args} />
    <Text.Component
      colour={Colour.contrasts[args.colour]}
      fontSize="h2"
    >{`Here is a text upside ${String(args.colour)}-color substrait`}</Text.Component>
  </AnyRelativeParent>
)

export const IconOnSubstrait = (args: Substrate.PropTypes) => (
  <AnyRelativeParent>
    <Substrate.Component colour={Colour.FOREGROUND} borderType="smooth" {...args} />
    <Icon.Component Shape={{ width: 20 }} src={EventIcon} {...args} />
  </AnyRelativeParent>
)

const AnyRelativeParent = styled.div({
  position: 'relative', // Important
  display: 'inline-block',
  padding: 20, // Important
})
