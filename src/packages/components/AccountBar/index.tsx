import React, { useMemo } from 'react'
import * as P from '../../../types/props'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../design/types'
import { FontSizes } from '../../../design/fonts'
import { Sizes } from '../../../design/sizes'
import { Substrate } from '../../core/Substrate'
import { Text } from '../../core/Text'
import { Image } from '../../core/Image'
import { Shape } from '../../core/Shape'
import { Spacer } from '../../core/Spacer'
import { Contrasts } from '../../../design/colors'
import { Grid } from '../../core/Grid'

export namespace AccountBar {
  export namespace PropTypes {
    type Optional = P.Optional

    type Required = P.Required<{
      userName: string
    }>

    type Default = P.Default<Text.Props.Default>

    export type Actual = P.Actual<Required, Default>

    export interface Props
      extends P.PropTypes<Required, Optional, Default>,
        Substrate.Props.Props,
        Image.Props.Props,
        Shape.Props.Props,
        Spacer.Props.Props,
        Text.Props.Props {}

    export const defaultProps: Default = {
      ...Text.Props.defaultProps,
      size: 'base',
      color: 'input',
      fontSize: 'h2',
      fontWeight: 'bold',
    }
  }

  const ICON_SIZE = 57

  export const Component = ({ sources, ...props }: PropTypes.Props) => {
    const actualProps = {
      ...PropTypes.defaultProps,
      ...props,
    }

    const { userName } = actualProps

    // Each word is separated by ' ' symbol. So, to get second userName we use to get [first, >SECOND<] second word
    const [_, match] = useMemo(() => userName.split(' '), [userName])

    return (
      <Wrapper {...actualProps}>
        <Substrate.Component corners="smooth" {...actualProps} />
        <Grid.Container.Component columns={2} gap={20}>
          <Grid.Item.Component align={{ y: 'center' }}>
            <Shape.Component {...actualProps} width={ICON_SIZE} height={ICON_SIZE}>
              <Image.Component {...{ ...actualProps, sources }} />
            </Shape.Component>
          </Grid.Item.Component>
          <TextContainer align={{ y: 'center' }}>
            <Text.Component
              {...actualProps}
              color={Contrasts[actualProps.color]}
              custom={[{ match, color: 'primary' }]}
            >
              {userName}
            </Text.Component>
          </TextContainer>
        </Grid.Container.Component>
      </Wrapper>
    )
  }

  const TextContainer = styled(Grid.Item.Component)<Grid.Item.Props.Props>(() => ({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }))

  const Wrapper = styled.div<PropTypes.Actual>(
    () => Substrate.Styled.Effects.Basic,
    ({ fontSize, size }) => ({
      userSelect: 'none',
      zIndex: 0,
      position: 'relative',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      background: 'transparent',
      paddingTop: FontSizes[fontSize] * Sizes[size] * 0.75,
      paddingBottom: FontSizes[fontSize] * Sizes[size] * 0.75,
      paddingLeft: FontSizes[fontSize] * Sizes[size] * 0.75,
      paddingRight: FontSizes[fontSize] * Sizes[size] * 0.75,
      [Grid.Container.Styled]: {
        gridTemplateColumns: `min-content auto`,
      },
    }),
  )
}

export default AccountBar.Component
