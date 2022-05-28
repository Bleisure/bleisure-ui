export const isEmptyArray = (array: unknown[]): array is [] => array.length === 0

export const exist = <T>(property: T | undefined | null): property is T =>
  property !== undefined && property !== null
