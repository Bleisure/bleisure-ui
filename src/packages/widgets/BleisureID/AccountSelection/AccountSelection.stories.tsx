import React from 'react'
import { Meta } from '@storybook/react'
import { AccountSelection } from '.'

export default {
  title: 'Widgets/BleisureID/AccountSelection',
  component: AccountSelection.Component,
} as Meta

export const Example = () => (
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
    <AccountSelection.Component />
  </div>
)
