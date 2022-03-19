import React from 'react'
import { Meta } from '@storybook/react'
import Login from '.'

export default {
  title: 'Widgets/BleisureID/Login',
  component: Login.Component,
  args: {},
} as Meta

export const Example = (args: Login.PropTypes.Props) => (
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
    <Login.Component {...args} />
  </div>
)
