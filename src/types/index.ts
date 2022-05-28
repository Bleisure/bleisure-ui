import { ComponentType, SVGProps } from 'react'
import { IfStrictEquals, ToBeFalse, ToBeTrue } from './check'

export type Req<R> = Required<R>

export type Nullable<T> = T | null

export type Merge<A, B> = A & B

export type SVGType = ComponentType<SVGProps<SVGSVGElement>>

export interface DangerInnerHTML {
  __html: string
}

export interface RefWithCurrent<T> {
  current: T | null
}

export type InputValueType = string | number | readonly string[] | undefined

export type UniqueArray<T> = T extends readonly [infer X, ...infer Rest]
  ? // We've just extracted X from T, having Rest be the remaining values.
    // Let's see if X is in Rest, and if it is, we know we have a duplicate
    InArray<Rest, X> extends true
    ? ['Encountered value with duplicates:', X]
    : // X is not duplicated, move on to check the next value, and see
      // if that's also unique.
      readonly [X, ...UniqueArray<Rest>]
  : // T did not extend [X, ...Rest], so there's nothing to do - just return T
    T

type UNIQUE_ARRAY_TEST_SUITE = [
  ToBeTrue<'Only unique values', IfStrictEquals<UniqueArray<'A' | 'B' | 'C'>, 'A' | 'B' | 'C'>>,
  ToBeFalse<'Duplicated values', IfStrictEquals<UniqueArray<'A' | 'B' | 'C'>, 'A' | 'B' | 'B'>>,
]

type InArray<T, X> =
  // See if X is the first element in array T
  T extends readonly [X, ...infer _Rest]
    ? true
    : // If not, is X the only element in T?
    T extends readonly [X]
    ? true
    : // No match, check if there's any elements left in T and loop recursive
    T extends readonly [infer _, ...infer Rest]
    ? InArray<Rest, X>
    : // There's nothing left in the array and we found no match
      false
