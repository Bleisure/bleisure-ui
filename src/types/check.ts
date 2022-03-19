export type IsTrue<T extends true> = T

export type IsFalse<T extends false> = T

export type IfStrictEquals<T, U, TOnTrue = true, TonFalse = false> = [T] extends [U]
  ? [U] extends [T]
    ? TOnTrue
    : TonFalse
  : TonFalse

type TEST_SUITE = [IsFalse<IfStrictEquals<Array<number>, Array<string>>>]
