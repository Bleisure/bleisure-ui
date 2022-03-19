import React from 'react'
import styled from 'styled-components'
import { __Colors, __Fonts, __Sizes } from '../../../../design/types'
import * as P from '../../../../types/props'
import { AccountBar } from '../../../components/AccountBar'
import { Button } from '../../../components/Button'
import { FormField } from '../../../components/FormField'
import { Grid } from '../../../core/Grid'
import { Shape } from '../../../core/Shape'
import { Spacer } from '../../../core/Spacer'
import { Substrate } from '../../../core/Substrate'
import { Text } from '../../../core/Text'

namespace Login {
  export namespace PropTypes {
    type Optional = P.Optional

    type Required = P.Required

    type Default = P.Default

    type Actual = P.Actual<Required, Default>

    export interface Props
      extends P.PropTypes<Required, Optional, Default>,
        AccountBar.Props.Props {}

    export const defaultProps: Default = {
      size: 'base',
    }
  }

  export const Component = (props: PropTypes.Props) => {
    const actualProps = {
      ...PropTypes.defaultProps,
      ...props,
    }

    return (
      <Grid.Container.Component columns={3}>
        <Grid.Item.Component align={{ x: 'stretch', y: 'stretch' }}>
          <RestyledSpacer space={75} spaceDirection="x">
            <Grid.Container.Component columns={1}>
              <Grid.Item.Component align={{ y: 'center' }}>
                <Spacer.Component space={5} spaceDirection="x">
                  <Text.Component
                    {...actualProps}
                    fontSize="h1"
                    fontWeight="bold"
                    custom={[{ match: 'ID', color: 'primary' }]}
                  >
                    {/* TODO Вынести в лого */}
                    Bleisure ID
                  </Text.Component>
                  <Spacer.Component space={10} />
                  <Text.Component
                    {...actualProps}
                    fontSize="h3"
                    fontWeight="light"
                    custom={[{ match: 'Вас', color: 'primary' }]}
                  >
                    Мы рады приветствовать Вас
                  </Text.Component>
                </Spacer.Component>
              </Grid.Item.Component>
              <Grid.Item.Component align={{ y: 'center' }}>
                <FormField.Component
                  fontSize="h4"
                  fontWeight="light"
                  inputProps={{ placeholder: 'Введи свои учётные данные' }}
                />
                <Spacer.Component space={5} />
                <FormField.Component
                  fontSize="h4"
                  fontWeight="light"
                  inputProps={{ placeholder: 'Пароль' }}
                />
              </Grid.Item.Component>
              <Grid.Item.Component align={{ y: 'center' }}>
                <Button.Component {...actualProps} fontSize="h3" space={12}>
                  Войти
                </Button.Component>
              </Grid.Item.Component>
              <Grid.Item.Component align={{ y: 'center' }}>
                <RestyledGridContainer columns={4} gap={10}>
                  {[...Array(4)].map(() => (
                    <Grid.Item.Component align={{ x: 'center' }}>
                      <Shape.Component width={50}>
                        <Substrate.Component color="input" />
                      </Shape.Component>
                    </Grid.Item.Component>
                  ))}
                </RestyledGridContainer>
                <Spacer.Component space={10} />
                <Button.Component
                  corners="smooth"
                  color="input"
                  space={10}
                  fontSize="h4"
                  fontWeight="light"
                >
                  Присоединиться
                </Button.Component>
              </Grid.Item.Component>
            </Grid.Container.Component>
          </RestyledSpacer>
        </Grid.Item.Component>
        <Grid.Item.Component start={{ x: 2 }} end={{ x: 4 }}>
          <Substrate.Component color="input" />
        </Grid.Item.Component>
      </Grid.Container.Component>
    )
  }

  const RestyledSpacer = styled(Spacer.Component)(() => ({
    height: '100%',
    width: '100%',
  }))

  const RestyledGridContainer = styled(Grid.Container.Component)(() => ({
    gridTemplateColumns: 'repeat(4, min-content)',
    justifyContent: 'center',
  }))
}

export default Login
