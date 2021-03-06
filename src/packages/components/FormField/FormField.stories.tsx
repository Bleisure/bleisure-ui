import React from 'react'
import { Meta } from '@storybook/react'
import { FormField } from '.'
import { Text } from '../../core/Text'
import { Spacer } from '../../core/Spacer'

export default {
  title: 'Components/FormField',
  component: FormField.Component,
  args: FormField.defaultProps,
} as Meta

export const MatchRules = (args: FormField.PropTypes) => (
  <>
    <Spacer.Component spaceDirection="y">
      <Text.Component>{`The rules are: availableLength: { from: 5, to: 20 }`}</Text.Component>
    </Spacer.Component>
    <FormField.Component
      Input={{
        inputProps: { defaultValue: 'Text' },
      }}
      rules={{ availableLength: { from: 5, to: 20 } }}
      {...args}
    />
  </>
)

export const OnChangeReaction = (args: FormField.PropTypes) => (
  <FormField.Component
    Input={{
      inputProps: { defaultValue: 'Input any key to reproduce' },
    }}
    {...args}
  />
)
