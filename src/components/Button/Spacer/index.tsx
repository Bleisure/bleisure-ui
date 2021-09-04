import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

export type SpacerProps = HTMLAttributes<HTMLSpanElement>

const Spacer = ({ className = '', style, ...restProps }: SpacerProps) => {
  const base = 'Spacer'

  return <StyledSpacer {...restProps} className={classNames(base, className)} />
}

const StyledSpacer = styled.span({
  padding: 20,
})

export default Spacer
