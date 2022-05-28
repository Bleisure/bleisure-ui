import React, { useState, useEffect } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { FontSizes, HasFontSize, HasFontWeight } from '../../../design/fonts'
import Scale from '../../../design/scale'
import { Substrate } from '../../core/Substrate'
import { Input } from '../../core/Input'
import Colour from '../../../design/colours'
import { Range } from '../../../utils/ranges.utils'
import { getMatch } from './stuff'
import { Nullable } from '../../../types'

/**
 * @TODO это будет работать через React hook Form
 */

/**
 * @description inputProps.value is deprecated, cause FormField is uncontrolled
 */
export namespace FormField {
  export const ComponentName = 'FormField'

  type Match = Nullable<number>
  interface Rules {
    /**
     * @description This one still not working
     */
    regexp?: RegExp
    availableLength?: Range
  }

  interface PartialProps
    extends P.HasChildren,
      Partial<{
        rules: Rules
        [Substrate.ComponentName]: Substrate.PropTypes
      }> {}

  interface DefaultProps extends Scale.Property, Colour.Property, HasFontSize, HasFontWeight {}

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {
    [Input.ComponentName]: Input.PropTypes
  }

  export type ActualProps = P.Exclude<
    P.Override<PropTypes, DefaultProps>,
    typeof Substrate.ComponentName | typeof Input.ComponentName | 'children' | 'rules'
  >

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
    colour: Colour.INPUT,
    fontSize: 'h2',
    fontWeight: 'bold',
  }

  interface FocusState {
    isFocused: boolean
  }

  interface KeyboardInteractiveState {
    /**
     * @description From 0 to 1 according some rules (for example - match any regexp)
     */
    match: Match
    keyPressed: boolean
  }

  export const initialFocusState: FocusState = {
    isFocused: false,
  }

  export const initialKeyboardInteractiveState: KeyboardInteractiveState = {
    match: null,
    keyPressed: false,
  }

  export const Component = ({
    Input: inputComponentProps,
    Substrate: substrateProps,
    children,
    rules,
    ...props
  }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    const { colour, scale, fontSize } = actualProps

    const { inputProps } = { ...inputComponentProps }

    const [focusState, setFocusState] = useState<FocusState>(initialFocusState)

    const [keyboardInteractiveState, setKeyboardInteractiveState] =
      useState<KeyboardInteractiveState>(initialKeyboardInteractiveState)

    // Check any default values to match for
    useEffect(() => {
      const { defaultValue } = { ...inputProps }

      const match = getMatch(defaultValue, rules?.availableLength)
      console.log(defaultValue, inputProps)
      setKeyboardInteractiveState({
        ...keyboardInteractiveState,
        match,
      })
    }, [inputProps])

    const reference = React.createRef<HTMLInputElement>()

    function focusOnInput() {
      reference.current?.focus()
      setFocusState({ isFocused: true })
    }

    return (
      <Wrapper
        onClick={focusOnInput}
        {...{
          ...focusState,
          ...keyboardInteractiveState,
          fontSize,
          colour,
          scale,
        }}
      >
        <Substrate.Component borderType="smooth" {...substrateProps} />
        <Input.Component
          getRef={reference}
          colour={Colour.contrasts[colour]}
          inputProps={{
            ...inputProps,
            onChange: ({ currentTarget: { value } }) =>
              setKeyboardInteractiveState({
                ...keyboardInteractiveState,
                match: getMatch(value, rules?.availableLength),
              }),
            onKeyDown: () =>
              setKeyboardInteractiveState({
                ...keyboardInteractiveState,
                keyPressed: true,
              }),
            onKeyUp: () =>
              setKeyboardInteractiveState({
                ...keyboardInteractiveState,
                keyPressed: false,
              }),
            onFocus: () => setFocusState({ isFocused: true }),
            onBlur: () => {
              setFocusState({ isFocused: false })
              setKeyboardInteractiveState({
                ...keyboardInteractiveState,
                keyPressed: false,
              })
            },
          }}
          {...inputComponentProps}
        />
      </Wrapper>
    )
  }

  Component.displayName = ComponentName

  interface WrapperProps
    extends Substrate.Styled.Reactions.FocusProps,
      Substrate.Styled.Reactions.KeyPressProps,
      KeyboardInteractiveState,
      HasFontSize,
      Scale.Property {}

  const Wrapper = styled.div<WrapperProps>(
    () => Substrate.Styled.Reactions.Focus,
    ({ keyPressed }) => keyPressed && Substrate.Styled.Reactions.KeyPress,
    ({ match }) => match && Substrate.Styled.Reactions.Matching({ opacity: match }),
    ({ fontSize, scale }) => ({
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      background: 'transparent',
      paddingTop: FontSizes[fontSize] * Scale.get[scale] * 0.75,
      paddingBottom: FontSizes[fontSize] * Scale.get[scale] * 0.75,
      paddingLeft: FontSizes[fontSize] * Scale.get[scale],
      paddingRight: FontSizes[fontSize] * Scale.get[scale],
      boxSizing: 'border-box',
      '& > *': {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }),
  )
}

export default FormField.Component
