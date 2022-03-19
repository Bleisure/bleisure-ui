import React from 'react'
import { __Colors, __Fonts, __FontSizes, __FontWeights, __Sizes } from '../design/types'
import { DangerInnerHTML, Merge, RefWithCurrent, Req } from '.'

export type Required<R = {}> = Readonly<Req<R>>

export type Optional<O extends Object = {}> = Readonly<Partial<Merge<O, HasChildren>>>

export type Default<D extends Object = {}> = Readonly<Merge<D, HasSize>>

/**
 * @R required
 * @O optional
 * @D default
 */
export type PropTypes<D, O, R> = Partial<D> & Partial<O> & Req<R>

export type Actual<R, D> = Merge<R, D>

export interface HasColor {
  color: keyof __Colors
}

export interface HasSize {
  size: keyof __Sizes
}

export interface HasTypoOptions {
  fontFamily: keyof __Fonts
  fontSize: keyof __FontSizes
  fontWeight: keyof __FontWeights
}

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
