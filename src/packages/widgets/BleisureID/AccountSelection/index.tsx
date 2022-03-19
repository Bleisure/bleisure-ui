import React from 'react'
import { __Colors, __Fonts, __Sizes } from '../../../../design/types'
import * as P from '../../../../types/props'
import { AccountBar } from '../../../components/AccountBar'
import { Button } from '../../../components/Button'
import { Grid } from '../../../core/Grid'
import { Spacer } from '../../../core/Spacer'
import { Substrate } from '../../../core/Substrate'
import { Text } from '../../../core/Text'

export namespace AccountSelection {
  export namespace Props {
    type Optional = P.Optional

    type Required = P.Required

    export type Default = P.Default

    export type Actual = P.Actual<Required, Default>

    export interface Props
      extends P.PropTypes<Required, Optional, Default>,
        AccountBar.Props.Props {}

    export const defaultProps: Default = {
      size: 'base',
    }
  }

  export const Component = (props: Props.Props) => {
    const actualProps = {
      ...Props.defaultProps,
      ...props,
    }

    return (
      <Grid.Container.Component columns={3}>
        <Grid.Item.Component align={{ x: 'stretch', y: 'stretch' }}>
          <Grid.Container.Component columns={1}>
            <Grid.Item.Component align={{ y: 'center' }}>
              <Spacer.Component spaceDirection="x" space={50}>
                <Spacer.Component space={5} spaceDirection="x">
                  <Text.Component
                    {...actualProps}
                    fontSize="h1"
                    fontWeight="bold"
                    custom={[{ match: 'ID', color: 'primary' }]}
                  >
                    Bleisure ID
                  </Text.Component>
                </Spacer.Component>
              </Spacer.Component>
            </Grid.Item.Component>
            <Grid.Item.Component align={{ y: 'center' }}>
              <Spacer.Component spaceDirection="x" space={50}>
                <AccountBar.Component {...actualProps} />
              </Spacer.Component>
            </Grid.Item.Component>
            <Grid.Item.Component align={{ y: 'center' }}>
              <Spacer.Component spaceDirection="x" space={50}>
                <Button.Component {...actualProps}>Войти под другим аккаунтом</Button.Component>
              </Spacer.Component>
            </Grid.Item.Component>
          </Grid.Container.Component>
        </Grid.Item.Component>
        <Grid.Item.Component start={{ x: 2 }} end={{ x: 4 }}>
          <Substrate.Component color="input" />
        </Grid.Item.Component>
      </Grid.Container.Component>
    )
  }
}
