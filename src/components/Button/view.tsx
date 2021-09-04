import React, { ReactNode, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { HasChildren } from '../../types/props'
import styled from 'styled-components'
import { Colors } from '../../assets/styles/colors'
import { __Colors } from '../../assets/styles/types'
import Spacer from './Spacer'

export interface ButtonProps extends HasChildren {
  /**
   * @TODO мб вынести типы как Colors
   */
  color?: keyof __Colors
  before?: ReactNode
  after?: ReactNode

  buttonProps?: HTMLAttributes<HTMLButtonElement>
}

const Button = ({
  color = 'primary',
  children,
  buttonProps,
  before,
  after,
  ...props
}: ButtonProps) => {
  return (
    <Wrapper
      {...{
        ...buttonProps,
        color,
      }}
    >
      <ButtonTile {...{ color }} />
      {before}
      {before && <Spacer />}
      <Text>{children}</Text>
      {after && <Spacer />}
      {after}
    </Wrapper>
  )
}

const ButtonTile = styled.div<ButtonProps>(({ color }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  borderRadius: 15,
  backgroundColor: Colors[color!],
  boxShadow: `0 0 50px -18px ${Colors[color!]}`,
  transition: '0.1s ease-in-out',
}))

const Text = styled.span<ButtonProps>(({ color }) => ({
  color: Colors['main'],
  transition: '0.1s ease-in-out',
}))

const Wrapper = styled.button<ButtonProps>(({ color }) => ({
  position: 'relative',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  font: '21px "Gilroy", sans-serif',
  background: 'transparent',
  padding: '17px 24px',
  minWidth: 313,
  fontSize: 21,
  fontWeight: 700,
  [`&:hover ${ButtonTile}`]: {
    boxShadow: `0 0 42px -12px ${Colors[color!]}`,
    transition: '0.2s ease-in-out',
  },
  [`&:active ${ButtonTile}`]: {
    boxShadow: `0 0 40px -15px ${Colors[color!]}`,
    filter: 'brightness(1.05)',
    transform: 'scale(0.99)',
    backfaceVisibility: 'hidden',
    transition: '0.2s ease-in-out',
  },
}))

const After = styled.button({})

export default Button
