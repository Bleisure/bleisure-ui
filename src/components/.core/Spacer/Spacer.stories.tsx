import React from 'react'
import { Meta } from '@storybook/react'
import { Text } from '../Text'
import { Spacer } from '.'
import { Container } from '../Container'

export default {
  title: 'Core/Spacer',
  component: Spacer.Component,
  description:
    "Parent must hold it's position relative (relative parent contains this substrate)",
  args: Spacer.defaultProps,
} as Meta

export const Separator = (args: Spacer.Props.Props) => (
  <Container.Component
    after={{ x: <Text.Component {...args}>Text after spacer</Text.Component> }}
    before={{
      x: <Text.Component {...args}>Text before spacer</Text.Component>,
    }}
    {...args}
  >
    <Text.Component {...args}>Text between two spacers</Text.Component>
  </Container.Component>
)

export const SpaceCreator = (args: Spacer.Props.Props) => (
  <Spacer.Component {...args}>
    <Text.Component {...args}>Space around text</Text.Component>
  </Spacer.Component>
)
