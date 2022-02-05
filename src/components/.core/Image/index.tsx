import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { __Props } from '../../../types/props'

export namespace Image {
  interface Sources {
    small?: string
    medium: string
    large?: string
  }

  interface Orientation {
    landscape: Sources
    portrait?: Sources
  }

  export namespace Props {
    interface Optional extends __Props.Optional {}

    interface Required extends __Props.Required {}

    export interface Default extends __Props.Default {}

    export interface Actual extends Default, Required, Optional {}

    export interface Props extends Partial<Default>, Required, Optional {
      srcSet: Orientation
    }
  }

  namespace State {
    export interface Load {
      readonly imageLoaded: boolean
    }
  }

  const defaultProps: Props.Default = {
    size: 'base',
  }

  const initialLoadState: State.Load = {
    imageLoaded: false,
  }

  export const Component = ({ srcSet, ...props }: Props.Props) => {
    const actualProps = {
      ...defaultProps,
      ...props,
    }

    const [loadState, setLoadState] = useState<State.Load>(initialLoadState)

    useEffect(() => {
      setLoadState({ imageLoaded: false })
    }, [srcSet])

    // TODO: Нужен ли задел для ориентации изображения?
    return (
      <div>
        <Image
          {...{ ...actualProps, ...loadState }}
          className="source"
          onLoad={() => setLoadState({ imageLoaded: true })}
          src={srcSet.landscape.medium}
          alt="picture"
          srcSet={`${srcSet.landscape.small} 480w,
            ${srcSet.landscape.medium} 720w,
            ${srcSet.landscape.large} 1280w`} // TODO: цифры взяты из головы
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
