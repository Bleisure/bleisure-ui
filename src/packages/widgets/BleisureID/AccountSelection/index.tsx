import React from 'react'
import Colour from '../../../../design/colours'
import { AccountBar } from '../../../components/AccountBar'
import { Button } from '../../../components/Button'
import { Grid } from '../../../core/Grid'
import { Spacer } from '../../../core/Spacer'
import { Substrate } from '../../../core/Substrate'
import { Text } from '../../../core/Text'

export namespace AccountSelection {
  export const Component = () => {
    return (
      <Grid.Container.Component columns={3}>
        <Grid.Item.Component align={{ x: 'stretch', y: 'stretch' }}>
          <Grid.Container.Component columns={1}>
            <Grid.Item.Component align={{ y: 'center' }}>
              <Spacer.Component spaceDirection="x" space={50}>
                <Spacer.Component space={5} spaceDirection="x">
                  <Text.Component
                    fontSize="h1"
                    fontWeight="bold"
                    customize={[{ match: 'ID', colour: Colour.PRIMARY }]}
                  >
                    Bleisure ID
                  </Text.Component>
                </Spacer.Component>
              </Spacer.Component>
            </Grid.Item.Component>
            <Grid.Item.Component align={{ y: 'center' }}>
              <Spacer.Component spaceDirection="x" space={50}>
                <AccountBar.Component userName="ASD" />
              </Spacer.Component>
            </Grid.Item.Component>
            <Grid.Item.Component align={{ y: 'center' }}>
              <Spacer.Component spaceDirection="x" space={50}>
                <Button.Component>Войти под другим аккаунтом</Button.Component>
              </Spacer.Component>
            </Grid.Item.Component>
          </Grid.Container.Component>
        </Grid.Item.Component>
        <Grid.Item.Component start={{ x: 2 }} end={{ x: 4 }}>
          <Substrate.Component colour={Colour.INPUT} />
        </Grid.Item.Component>
      </Grid.Container.Component>
    )
  }
}
