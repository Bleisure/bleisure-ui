import React from 'react'
import { DangerInnerHTML, Merge, RefWithCurrent, Req } from '.'

// TODO: tests
export type Exclude<T, K extends keyof T> = Omit<T, K>

// TODO: tests
/**
 * @description Overrides same properties from T to R
 */
export type Override<T, R> = keyof R extends keyof T ? Merge<Exclude<T, keyof R>, R> : Merge<T, R>

export type PropTypes<D, R, O> = Partial<D> & Req<R> & Partial<O>

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
