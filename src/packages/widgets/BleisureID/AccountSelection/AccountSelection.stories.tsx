import React from 'react'
import { Meta } from '@storybook/react'
import { AccountSelection } from '.'

const USER_MOCK_1 = {
  name: 'Виктория Сидорова',
  src: 'https://i.pinimg.com/originals/9b/0f/6e/9b0f6e98b7a9ef81917e726555da7710.jpg',
} as const

export default {
  title: 'Widgets/BleisureID/AccountSelection',
  component: AccountSelection.Component,
  args: {
    userName: USER_MOCK_1.name,
    sources: USER_MOCK_1.src,
  },
} as Meta

export const Example = (args: AccountSelection.Props.Props) => (
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
    <AccountSelection.Component {...args} />
  </div>
)
