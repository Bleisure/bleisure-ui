export type Modify<T, R> = Omit<T, keyof R> & R

export type Nullable<T> = T | null | undefined

export interface Dictionary<T> {
  [id: string]: T
}

export type PickRename<T, K extends keyof T, R extends PropertyKey> = Omit<T, K> &
  { [P in R]: T[K] }

export interface Creatable<Setter, Getter> {
  defaults?: Getter
  bind: Setter

  saveChanges(): void

  onChange(e: React.ChangeEvent<HTMLInputElement>, callback?)
  onCheck(e: React.ChangeEvent<HTMLInputElement>, callback?)

  onChangeFromObject?: (
    fieldName: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>, callback?) => void

  onChangeFromArray?: (
    idx: number,
    fieldName: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>, callback?) => void
}

export interface ShouldBeSerialized<T> {
  serialize(): T
}

export interface HasURLParams<T = string> {
  url?: T
  postfix?: string
}

export interface OptionType {
  label: string
  value: number
}

export interface HasPaginationParams {
  page?: number
}

export interface HasSearchParam {
  search?: string
}

export interface HasSortParam {
  sortBy?: string
}

export interface HasIndexParam {
  id: number
}

export interface NamedType {
  id: number
  name: string
}

export interface ImageType {
  id: number
  path: string
}

export interface Errors {
  errors?: any
}

export interface Message {
  message?: string
}

export interface ErrorReply extends Message, Errors {}

export interface MessageReply<T> extends ErrorReply {
  data: T
}

export interface PaginationSerialized<T = any> {
  data: T[]
  current_page: number
  last_page: number
  from: number
  to: number
}

export interface Pagination<T = any> {
  data: T[]
  currentPage: number
  lastPage?: number
  from: number
  to: number
}
