export declare const tag: unique symbol

export type Tag<T extends string = string> = { readonly [tag]: T }

export type Opaque<T extends string, R> = Tag<T> & R

export type OpaqueType<Tag extends string, T> = {
  [K in keyof T]: Opaque<Tag, T[K]>
}
