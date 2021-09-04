import { NamedType, Nullable, OptionType } from '../types/types'

export function toOptionType(
  source: Nullable<NamedType | NamedType[]>,
): OptionType | OptionType[] | null {
  if (!source) return null

  return Array.isArray(source)
    ? source.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    : (({ id, name }) => ({
        value: id,
        label: name,
      }))(source)
}

export function getOptionsID(options?: Nullable<OptionType[]>) {
  return options && options.map(({ value }) => value)
}
