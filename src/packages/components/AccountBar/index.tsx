import React, { useMemo } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { FontSizes, HasFontSize } from '../../../design/fonts'
import Scale from '../../../design/scale'
import { Substrate } from '../../core/Substrate'
import { Text } from '../../core/Text'
import { Image } from '../../core/Image'
import { Shape } from '../../core/Shape'
import Colour from '../../../design/colours'
import { Grid } from '../../core/Grid'

export namespace AccountBar {
  export const ComponentName = 'AccountBar'
  type PartialProps = Partial<{
    [Substrate.ComponentName]: Substrate.PropTypes
    [Image.ComponentName]: Image.PropTypes
    [Shape.ComponentName]: P.Override<Shape.PropTypes, { width?: number }>
    [Text.ComponentName]: Text.PropTypes
    [Grid.Container.ComponentName]: P.Override<Grid.Container.PropTypes, { columns?: number }>
    [Grid.Item.ComponentName]: Grid.Item.PropTypes
  }>

  interface DefaultProps extends Colour.Property, Scale.Property {}

  export interface PropTypes extends PartialProps, Partial<DefaultProps> {
    userName: string
  }

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
    colour: Colour.INPUT,
  }

  type ActualProps = P.Exclude<
    P.Override<PropTypes, DefaultProps>,
    | typeof Substrate.ComponentName
    | typeof Image.ComponentName
    | typeof Shape.ComponentName
    | typeof Text.ComponentName
    | typeof Grid.Container.ComponentName
    | typeof Grid.Item.ComponentName
  >

  const ICON_SIZE = 57

  export const Component = ({
    [Image.ComponentName]: imageProps,
    [Shape.ComponentName]: shapeProps,
    [Substrate.ComponentName]: substrateProps,
    [Text.ComponentName]: textProps,
    [Grid.Container.ComponentName]: gridContainerProps,
    [Grid.Item.ComponentName]: gridItemProps,
    ...props
  }: PropTypes) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    const { userName, colour, scale } = actualProps

    const { fontSize } = {
      ...Text.defaultProps,
      ...textProps,
    }

    // Each word is separated by ' ' symbol. So, to get second userName we use to get [first, >SECOND<] second word
    const [, secondName] = useMemo(() => userName.split(' '), [userName])

    return (
      <Wrapper {...{ fontSize, scale, colour }}>
        <Substrate.Component
          scale={scale}
          borderType="smooth"
          colour={colour}
          {...substrateProps}
        />
        <Grid.Container.Component scale={scale} columns={2} gap={20} {...gridContainerProps}>
          <Grid.Item.Component align={{ y: 'center' }} {...gridItemProps}>
            <Shape.Component scale={scale} width={ICON_SIZE} height={ICON_SIZE} {...shapeProps}>
              <Image.Component {...imageProps} />
            </Shape.Component>
          </Grid.Item.Component>
          <TextContainer scale={scale} align={{ y: 'center' }}>
            <Text.Component
              customize={[{ match: secondName, colour: Colour.PRIMARY }]}
              colour={Colour.contrasts[colour]}
              fontSize="h2"
              fontWeight="bold"
              {...textProps}
            >
              {userName}
            </Text.Component>
          </TextContainer>
        </Grid.Container.Component>
      </Wrapper>
    )
  }

  Component.displayName = ComponentName

  const TextContainer = styled(Grid.Item.Component)({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  })

  interface WrapperProps extends Scale.Property, HasFontSize, Substrate.Styled.Effects.BasicProps {}

  const Wrapper = styled.div<WrapperProps>(
    () => Substrate.Styled.Effects.Basic,
    ({ fontSize, scale }) => ({
      userSelect: 'none',
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      background: 'transparent',
      paddingTop: FontSizes[fontSize] * Scale.get[scale] * 0.75,
      paddingBottom: FontSizes[fontSize] * Scale.get[scale] * 0.75,
      paddingLeft: FontSizes[fontSize] * Scale.get[scale] * 0.75,
      paddingRight: FontSizes[fontSize] * Scale.get[scale] * 0.75,
      [Grid.Container.Styled]: {
        gridTemplateColumns: `min-content auto`,
      },
    }),
  )
}

export default AccountBar.Component
