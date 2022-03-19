import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import * as P from '../../../types/props'

export namespace Image {
  interface Sources {
    small?: string
    medium: string
    large?: string
  }

  interface Orientation<T> {
    landscape: T
    portrait?: T
  }

  export namespace Props {
    type Optional = P.Optional

    type Required = P.Required<{
      sources: Orientation<Sources> | string
    }>

    type Default = P.Default

    export type Actual = P.Actual<Required, Default>

    export interface Props extends P.PropTypes<Required, Optional, Default> {}

    export const defaultProps: Default = {
      size: 'base',
    }
  }

  namespace State {
    export interface Load {
      readonly imageLoaded: boolean
    }
  }

  const initialLoadState: State.Load = {
    imageLoaded: false,
  }

  const sourcesToString = (sources: Sources): string => {
    return `${sources.small} 480w,
    ${sources.medium} 720w,
    ${sources.large} 1280w`
  }

  const orientationToString = (sources: Orientation<Sources>): Orientation<string> => {
    const orientation: Orientation<string> = {
      landscape: sourcesToString(sources.landscape),
    }

    if (sources.portrait) {
      orientation.portrait = sourcesToString(sources.portrait)
    }

    return orientation
  }

  export const Component = ({ sources: source, ...props }: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    const [loadState, setLoadState] = useState<State.Load>(initialLoadState)

    // TODO вынести
    const sources = useMemo<Orientation<Sources>>(() => {
      if (typeof source === 'string') {
        const src: Sources = {
          small: source,
          medium: source,
          large: source,
        }

        return {
          landscape: src,
          portrait: src,
        }
      }

      return source
    }, [source])

    // TODO: Нужен ли задел для ориентации изображения?
    return (
      <div>
        <Image
          {...{ ...actualProps, ...loadState, sources }}
          className="source"
          onLoad={() => setLoadState({ imageLoaded: true })}
          alt="picture"
          src={sources.landscape.medium}
          srcSet={orientationToString(sources).landscape} // TODO: цифры взяты из головы
          sizes="(max-width: 480px): 440px,
          (max-width: 720px): 700px,
          1280px"
        />
      </div>
    )
  }

  const Image = styled.img<Props.Actual & State.Load>(
    // ({ size, imageLoaded }) => ({
    () => ({
      position: 'relative',
      maxWidth: '100%',
      // opacity: imageLoaded ? 1 : 0,
      // transition: 'opacity 0.1s',
    }),
  )
}

/**
 * @DOCS
 */

{
  /* <picture>

   <source media="(orientation: landscape)"
             
      srcset="land-small-car-image.jpg 200w,
              land-medium-car-image.jpg 600w,
              land-large-car-image.jpg 1000w"
             
      sizes="(min-width: 700px) 500px,
             (min-width: 600px) 400px,
             100vw">
     
   <source media="(orientation: portrait)"
             
      srcset="port-small-car-image.jpg 700w,
              port-medium-car-image.jpg 1200w,
              port-large-car-image.jpg 1600w"
             
      sizes="(min-width: 768px) 700px,
             (min-width: 1024px) 600px,
             500px">
     
   <img src="land-medium-car-image.jpg" alt="Car">
</picture> */
}
