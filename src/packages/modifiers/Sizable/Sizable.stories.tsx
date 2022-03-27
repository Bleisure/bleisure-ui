import React from 'react'
import { Meta } from '@storybook/react'
import { Text } from '../../core/Text'
import Sizable, { SizableProps } from '.'
import { Container } from '../../core/Container'

export default {
  title: 'Core/Spacer',
  component: Sizable,
} as Meta

export const Separator = (args: SizableProps) => (
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
