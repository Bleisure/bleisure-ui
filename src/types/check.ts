export type ToBeTrue<N extends string, T extends true> = [T, N]

export type ToBeFalse<N extends string, T extends false> = [T, N]

/**
 * @deprecated use ToBeTrue
 */
export type IsTrue<T extends true> = T

/**
 * @deprecated use ToBeFalse
 */
export type IsFalse<T extends false> = T

export type IfStrictEquals<T, U, TOnTrue = true, TonFalse = false> = [T] extends [U]
  ? [U] extends [T]
    ? TOnTrue
    : TonFalse
  : TonFalse

type TEST_SUITE = [
  ToBeFalse<
    'Numeric array is not equal to array of strings',
    IfStrictEquals<Array<number>, Array<string>>
  >,
]
