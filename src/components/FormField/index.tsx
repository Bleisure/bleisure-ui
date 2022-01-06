import React, { useState, startTransition, useEffect } from 'react'
import { __Props } from '../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../assets/styles/types'
import { FontSizes } from '../../assets/styles/fonts'
import { Sizes } from '../../assets/styles/sizes'
import { Substrate } from '../.core/Substrate'
import { Input } from '../.core/Input'
import { Contrasts } from '../../assets/styles/colors'
import { mapRanges, Range } from '../../lib/mapRanges'
import { getMatch } from './stuff'
import { Nullable } from '../../types/types'

/**
 * @TODO это будет работать через React hook Form
 */

/**
 * @description inputProps.value is deprecated, cause FormField is uncontrolled
 */
export namespace FormField {
  interface Rules {
    /**
     * @description This one still not working
     */
    regexp?: RegExp
    availableLength?: Range
  }

  export namespace Props {
    interface Optional extends __Props.Optional {
      rules?: Rules
    }

    interface Required extends __Props.Required {}

    export interface Default extends Input.Props.Default {}

    export interface Actual extends Default, Required, Optional {}

    export interface Props
      extends Partial<Default>,
        Required,
        Optional,
        // Inner component types
        Substrate.Props.Props,
        Input.Props.Props {}
  }

  // TODO: разобраться с defaultProps
  export const defaultProps: Props.Default = {
    ...Input.defaultProps,
    color: 'input',
    fontSize: 'h2',
    fontWeight: 'bold',
  }

  export namespace Types {
    export type Match = Nullable<number>
  }

  namespace State {
    export interface Focus {
      isFocused: boolean
    }

    export interface KeyboardInteractive {
      /**
       * @description From 0 to 1 according some rules (for example - match any regexp)
       */
      match: Types.Match
      keyPressed: boolean
    }

    export const initialFocusState: State.Focus = {
      isFocused: false,
    }

    export const initialKeyboardInteractiveState: KeyboardInteractive = {
      match: null,
      keyPressed: false,
    }
  }

  export const Component = ({
    children,
    inputProps,
    rules,
    ...props
  }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    const [focusState, setFocusState] = useState<State.Focus>(
      State.initialFocusState,
    )

    const [keyboardInteractiveState, setKeyboardInteractiveState] =
      useState<State.KeyboardInteractive>(State.initialKeyboardInteractiveState)

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
        {...{
          ...actualProps,
          ...focusState,
          ...keyboardInteractiveState,
        }}
        onClick={focusOnInput}
      >
        <Substrate.Component {...actualProps} />
        <Input.Component
          {...{
            ...actualProps,
            inputProps: {
              ...inputProps,
              onChange: ({ currentTarget: { value } }) =>
                startTransition(() => {
                  setKeyboardInteractiveState({
                    ...keyboardInteractiveState,
                    match: getMatch(value, rules?.availableLength),
                  })
                }),
              onKeyDown: () =>
                startTransition(() => {
                  setKeyboardInteractiveState({
                    ...keyboardInteractiveState,
                    keyPressed: true,
                  })
                }),
              onKeyUp: () =>
                startTransition(() => {
                  setKeyboardInteractiveState({
                    ...keyboardInteractiveState,
                    keyPressed: false,
                  })
                }),
              onFocus: () => setFocusState({ isFocused: true }),
              onBlur: () => {
                setFocusState({ isFocused: false })
                setKeyboardInteractiveState({
                  ...keyboardInteractiveState,
                  keyPressed: false,
                })
              },
            },
          }}
          getRef={reference}
          color={Contrasts[actualProps.color]}
        />
      </Wrapper>
    )
  }

  const Wrapper = styled.div<
    Props.Actual & State.Focus & State.KeyboardInteractive
  >(
    () => Substrate.Styled.Reactions.Focus,
    ({ keyPressed }) => keyPressed && Substrate.Styled.Reactions.KeyPress,
    ({ match }) =>
      match && Substrate.Styled.Reactions.Matching({ opacity: match }),
    ({ fontSize, size }) => ({
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      background: 'transparent',
      paddingTop: FontSizes[fontSize] * Sizes[size] * 0.75,
      paddingBottom: FontSizes[fontSize] * Sizes[size] * 0.75,
      paddingLeft: FontSizes[fontSize] * Sizes[size],
      paddingRight: FontSizes[fontSize] * Sizes[size],
      boxSizing: 'border-box',
      '& > *': {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }),
  )
}
