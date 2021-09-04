import React, {
  HTMLAttributes,
  ComponentType,
  SVGProps,
  ImgHTMLAttributes,
} from 'react'
import classNames from 'classnames'
import { HasChildren } from '../../types/props'
import styled from 'styled-components'

export type IconProps = HTMLAttributes<HTMLImageElement> & {
  src: string
}

const Icon = ({ className = '', style, ...restProps }: IconProps) => {
  const _style: React.CSSProperties = {
    ...style,
  }
  const base = 'Icon'

  return (
    <StyledIcon
      {...restProps}
      style={_style}
      className={classNames(base, className)}
    />
  )
}

const StyledIcon = styled.img({
  verticalAlign: 'middle',
  display: 'inline-block',
})

export default Icon
