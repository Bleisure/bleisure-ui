import React from 'react'
import { __Sizes } from '../assets/styles/types'
import { DangerInnerHTML, RefWithCurrent } from './types'

export namespace __Props {
  export interface Default {
    readonly size: keyof __Sizes
  }

  export interface Required {}

  export interface Optional extends HasChildren {}

  export interface HasStyleObject {
    style?: React.CSSProperties
  }

  export interface HasChildren {
    children?: React.ReactNode
  }

  export interface HasRef<T> {
    getRef?: RefWithCurrent<T>
  }

  export interface HasDangerHTML {
    dangerouslySetInnerHTML?: DangerInnerHTML
  }
}
