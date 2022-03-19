export const isEmptyArray = (array: unknown[]): array is [] => array.length === 0

export const doesNotExist = <T>(property: T | undefined): property is undefined =>
  property === undefined

export const exist = <T>(property: T | undefined): property is T => property !== undefined
