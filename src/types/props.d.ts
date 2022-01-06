import React from 'react'
import { __Sizes } from '../assets/styles/types'
import { ContainerProps } from '../components/.core/Container'
import { RefWithCurrent } from './types'

export namespace __Props {
  interface Default {
    readonly size: keyof __Sizes
  }

  interface Required {}

  interface Optional extends HasChildren {}

  interface HasStyleObject {
    style?: React.CSSProperties
  }

  interface HasChildren {
    children?: React.ReactNode
  }

  interface HasRef<T> {
    getRef?: RefWithCurrent<T>
  }

  interface HasDangerHTML {
    dangerouslySetInnerHTML?: DangerInnerHTML
  }
}
