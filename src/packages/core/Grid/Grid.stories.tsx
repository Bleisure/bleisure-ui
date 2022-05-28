import React from 'react'
import { Meta } from '@storybook/react'
import { Grid } from '.'
import { Button } from '../../components/Button'

export default {
  title: 'Core/Grid',
  component: Grid.Container.Component,
  args: {
    ...Grid.Container.defaultProps,
    columns: 3,
  },
} as Meta

export const Example = (args: Grid.Container.PropTypes & Grid.Item.PropTypes) => (
  <div
    style={{
      display: 'block',
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      left: 0,
      top: 0,
    }}
  >
    <Grid.Container.Component {...args}>
      <Grid.Item.Component>
        <Button.Component>Hello,</Button.Component>
      </Grid.Item.Component>
      <Grid.Item.Component start={{ x: 2 }} end={{ x: 4 }}>
        <Button.Component>World!</Button.Component>
      </Grid.Item.Component>
    </Grid.Container.Component>
  </div>
)
