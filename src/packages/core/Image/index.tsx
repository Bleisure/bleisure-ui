import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import Scale from '../../../design/scale'
import * as P from '../../../types/props'

export namespace Image {
  export const ComponentName = 'Image'
  interface Sources {
    small?: string
    medium: string
    large?: string
  }

  interface Orientation<T> {
    landscape: T
    portrait?: T
  }

  type PartialProps = Partial<{
    sources: Orientation<Sources> | string
  }>

  export interface DefaultProps extends Scale.Property {}

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {}

  type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, 'sources'>

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
  }

  interface LoadingState {
    imageLoaded: boolean
  }

  const initialLoadState: LoadingState = {
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

  export const Component = ({ sources: source, ...props }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    // TODO: start using this
    const [loadState, setLoadState] = useState<LoadingState>(initialLoadState)

    // TODO return something but null
    if (!source) return null

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

    const { landscape } = useMemo(() => orientationToString(sources), [source])

    // TODO: Нужен ли задел для ориентации изображения?
    return (
      <div>
        <Styled
          className="source"
          onLoad={() => setLoadState({ imageLoaded: true })}
          alt="picture"
          src={sources.landscape.medium}
          srcSet={landscape} // TODO: цифры взяты из головы
          sizes="(max-width: 480px): 440px,
          (max-width: 720px): 700px,
          1280px"
        />
      </div>
    )
  }

  const Styled = styled.img({
    position: 'relative',
    maxWidth: '100%',
  })
}
