export const isString = (s: unknown): s is string => typeof s === 'string'

export const isStringArray = (s: unknown[]): s is string[] => s.every(isString)

export const join = (strings: string[], symbol: string = '') => strings.join(symbol)
