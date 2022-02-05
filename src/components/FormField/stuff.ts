import { FormField } from '.'
import { mapRanges, Range } from '../../utils/ranges.utils'
import { InputValueType } from '../../types/types'

type GetMatchImp = (v?: InputValueType, r?: Range) => FormField.Types.Match

export const getMatch: GetMatchImp = (value, range) => {
  if (value && typeof value === 'string' && range) {
    const match = mapRanges(value.length, range, {
      from: 0,
      to: 1,
    })
    return match > 0 ? match : null
  }

  return null
}
