export type Nullable<T> = T | null

export type SVGType = ComponentType<SVGProps<SVGSVGElement>>

export interface DangerInnerHTML {
  __html: string
}

export interface RefWithCurrent<T> {
  current: T | null
}

export type InputValueType = string | number | readonly string[] | undefined
