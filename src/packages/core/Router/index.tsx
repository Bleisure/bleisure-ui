import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  Route as CustomRouteType,
  RouteDictionary,
  officeAppRoutes,
  appRoutes,
} from '../../../common/dictionaries/routes'

const Root = ({ routes }: { routes: RouteDictionary }) => {
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={300} classNames="fade">
            <Routes location={location}>
              {Object.values(routes).map(
                ({
                  component,
                  absolutePath,
                  param = '',
                  exact,
                  credentials,
                }: CustomRouteType) => (
                  <Route
                    key={absolutePath}
                    path={`${absolutePath}/${param}`}
                    {...{ exact }}
                    element={component}
                  />
                ),
              )}
              <Route element={<Navigate to={{ pathname: '/' }} />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  )
}

export default Root
