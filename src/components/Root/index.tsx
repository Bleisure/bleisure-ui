import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Types from 'MyTypes'
import { Route as CustomRouteType, Route as RouteType } from '../../common/routes'
import isSatisfied from '../../lib/isSatisfied'
import actions from '../../redux/actions'
import { CredentialsBaseState } from '../../redux/reducers/client-reducer'
import { Dictionary } from '../../types/types'
import { EVERYBODY } from '../../common/roles'

export interface DispatchedRootProps {
  getProfile: typeof actions.client.getProfile
}

export interface StoredRootProps {
  credentials: CredentialsBaseState
}

interface InjectedProps extends DispatchedRootProps, StoredRootProps {
  routes: Dictionary<RouteType>
}

const Root = ({ routes, credentials, getProfile }: InjectedProps) => {
  useEffect(() => {
    getProfile()
  }, [])
  return !credentials ? null : (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={300} classNames="fade">
            <Switch location={location}>
              {Object.values(routes).map(
                ({
                  component: Component,
                  path,
                  param = '',
                  label,
                  credentials: requirements,
                  ...rest
                }: CustomRouteType) => (
                  <Route
                    key={`${path}/${param}`}
                    path={`${path}/${param}`}
                    {...rest}
                  >
                    {Component && <Component {...{ label }} />}
                  </Route>
                ),
              )}
              {isSatisfied(EVERYBODY, credentials) && (
                <Route
                  render={() => <Redirect to={{ pathname: routes.main.path }} />}
                />
              )}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  )
}

export default connect(
  ({ client }: Types.RootState): StoredRootProps => ({
    credentials: client.credentials,
  }),
  (dispatch: Dispatch<Types.RootAction>): DispatchedRootProps =>
    bindActionCreators(
      {
        getProfile: actions.client.getProfile,
      },
      dispatch,
    ),
)(Root)
