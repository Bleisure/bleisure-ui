import React from 'react'
import styled from 'styled-components'
import Colour from '../../../../design/colours'
import Scale from '../../../../design/scale'
import { AccountBar } from '../../../components/AccountBar'
import { Button } from '../../../components/Button'
import { FormField } from '../../../components/FormField'
import { Grid } from '../../../core/Grid'
import { Shape } from '../../../core/Shape'
import { Spacer } from '../../../core/Spacer'
import { Substrate } from '../../../core/Substrate'
import { Text } from '../../../core/Text'

namespace Login {
  export const ComponentName = 'Login'

  type PartialProps = Partial<{
    [AccountBar.ComponentName]: AccountBar.PropTypes
  }>
  export interface DefaultProps extends Scale.Property {}

  export interface PropTypes extends Partial<DefaultProps>, PartialProps {}

  export const defaultProps: DefaultProps = {
    scale: Scale.BASE,
  }

  export const Component = (props: Readonly<PropTypes>) => {
    const actualProps = {
      ...defaultProps,
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
                    customize={[{ match: 'ID', colour: Colour.PRIMARY }]}
                  >
                    {/* TODO Вынести в лого */}
                    Bleisure ID
                  </Text.Component>
                  <Spacer.Component space={10} />
                  <Text.Component
                    {...actualProps}
                    fontSize="h3"
                    fontWeight="light"
                    customize={[{ match: 'Вас', colour: Colour.PRIMARY }]}
                  >
                    Мы рады приветствовать Вас
                  </Text.Component>
                </Spacer.Component>
              </Grid.Item.Component>
              <Grid.Item.Component align={{ y: 'center' }}>
                <FormField.Component
                  fontSize="h4"
                  fontWeight="light"
                  Input={{
                    inputProps: { placeholder: 'Введи свои учётные данные' },
                  }}
                />
                <Spacer.Component space={5} />
                <FormField.Component
                  fontSize="h4"
                  fontWeight="light"
                  Input={{
                    inputProps: { placeholder: 'Пароль' },
                  }}
                />
              </Grid.Item.Component>
              <Grid.Item.Component align={{ y: 'center' }}>
                <Button.Component {...actualProps} Text={{ fontSize: 'h3' }} Spacer={{ space: 12 }}>
                  Войти
                </Button.Component>
              </Grid.Item.Component>
              <Grid.Item.Component align={{ y: 'center' }}>
                <RestyledGridContainer columns={4} gap={10}>
                  {[...Array(4)].map(() => (
                    <Grid.Item.Component align={{ x: 'center' }}>
                      <Shape.Component width={50}>
                        <Substrate.Component colour={Colour.INPUT} />
                      </Shape.Component>
                    </Grid.Item.Component>
                  ))}
                </RestyledGridContainer>
                <Spacer.Component space={10} />
                <Button.Component
                  Substrate={{ borderType: 'smooth' }}
                  Spacer={{ space: 10 }}
                  Text={{ fontSize: 'h4', fontWeight: 'light' }}
                  colour={Colour.INPUT}
                >
                  Присоединиться
                </Button.Component>
              </Grid.Item.Component>
            </Grid.Container.Component>
          </RestyledSpacer>
        </Grid.Item.Component>
        <Grid.Item.Component start={{ x: 2 }} end={{ x: 4 }}>
          <Substrate.Component colour={Colour.INPUT} />
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
