import { ElementType } from 'react'
import { Dictionary } from '../types/types'
import { IconProps } from '../components/generic/Icon'

// Pages
import * as pages from '../pages'
import { Credentials } from '../models'
import roles, { EVERYBODY } from './roles'

export const getThisRoutes = (
  routes: RouteDictionary | HashDictionary,
): Dictionary<Route> => {
  return (({ main, notFound, ...rest }) => ({ ...rest }))(routes)
}

export interface Route {
  param?: string
  path: string
  label: string
  visibleInHeader?: boolean
  component?: ElementType
  exact?: boolean
  credentials: Array<Credentials> | Credentials
  render?: () => JSX.Element
}

export interface HashDictionary extends Dictionary<Route> {
  main: Route
}

export interface RouteDictionary extends Dictionary<Route> {
  main: Route
  notFound: Route
}

export const routes: RouteDictionary = {
  notFound: {
    path: '/',
    label: '404 Страница не найдена',
    component: pages.Page404,
    credentials: EVERYBODY,
  },
  main: {
    path: '/settings',
    label: 'Настройки',
    exact: true,
    component: pages.SettingsPage,
    credentials: EVERYBODY,
  },
  ROAD_MAP_SETTINGS_PAGE: {
    path: '/settings/road-map',
    label: 'Настройка дорожной карты',
    exact: true,
    component: pages.RoadMapSettingsPage,
    credentials: [roles.RZU, roles.ROSS],
  },
  ROAD_MAP_CREATE_PAGE: {
    path: '/settings/road-map/create',
    label: 'Создание дорожной карты',
    exact: true,
    component: pages.RoadMapCreatePage,
    credentials: [roles.RZU, roles.ROSS],
  },
  ROAD_MAP_EDIT_PAGE: {
    path: '/settings/road-map/create',
    param: ':id',
    label: 'Создание дорожной карты',
    component: pages.RoadMapCreatePage,
    credentials: [roles.RZU, roles.ROSS],
  },
  ROAD_MAP_VIEW_PAGE: {
    path: '/settings/road-map',
    param: ':id',
    exact: true,
    label: 'Просмотр дорожной карты',
    component: pages.RoadMapViewPage,
    credentials: [roles.RZU, roles.ROSS],
  },
  QUOTAS_SETTINGS_PAGE: {
    path: '/settings/quotas',
    label: 'План приема',
    exact: true,
    component: pages.QuotasSettingsPage,
    credentials: [roles.RZU, roles.ROSS],
  },
  QUOTAS_CREATE_PAGE: {
    path: '/settings/quotas/create',
    label: 'Создание потребности в квоте',
    exact: true,
    component: pages.QuotasCreatePage,
    credentials: [roles.RZU, roles.ROSS],
  },
  QUOTAS_EDIT_PAGE: {
    path: '/settings/quotas/create',
    param: ':id',
    label: 'Создание потребноси в квоте',
    component: pages.QuotasCreatePage,
    credentials: [roles.RZU, roles.ROSS],
  },
  QUOTAS_VIEW_PAGE: {
    path: '/settings/quotas',
    param: ':id',
    exact: true,
    label: 'Документ «Потребность в квоте».',
    component: pages.QuotasViewPage,
    credentials: [roles.RZU, roles.ROSS],
  },
  SCREENING_TEST_LIST_PAGE: {
    path: '/settings/screening-test',
    label: 'Отборочные испытания',
    exact: true,
    visibleInHeader: true,
    component: pages.ScreeningTestListPage,
    credentials: [roles.RZU, roles.ROSS],
  },
  SCREENING_TEST_CREATE_PAGE: {
    path: '/settings/screening-test/create',
    label: 'Создание отборочного испытания',
    exact: true,
    component: pages.ScreeningTestCreatePage,
    credentials: [roles.RZU, roles.ROSS],
  },
  SCREENING_TEST_EDIT_PAGE: {
    path: '/settings/screening-test/create',
    param: ':id',
    label: 'Создание отборочного испытания',
    exact: true,
    component: pages.ScreeningTestCreatePage,
    credentials: [roles.RZU, roles.ROSS],
  },
  SCREENING_TEST_VIEW_PAGE: {
    path: '/settings/screening-test',
    param: ':id',
    label: 'Просмотр отборочного испытания',
    exact: true,
    component: pages.ScreeningTestViewPage,
    credentials: [roles.RZU, roles.ROSS],
  },
  PROFILE_PAGE: {
    path: '/settings/profile',
    label: 'Профиль',
    component: pages.ProfilePage,
    credentials: EVERYBODY,
  },
  SELECTION_PROCEDURE_LIST_PAGE: {
    path: '/settings/selection-procedure',
    label: 'Порядок отбора кандидатов',
    exact: true,
    component: pages.SelectionProcedureListPage,
    credentials: [roles.RZU, roles.ROSS],
  },
  SELECTION_PROCEDURE_CREATE_PAGE: {
    path: '/settings/selection-procedure/create',
    label: 'Создание порядка отбора кандидатов',
    exact: true,
    component: pages.SelectionProcedureCreatePage,
    credentials: [roles.RZU],
  },
  SELECTION_PROCEDURE_EDIT_PAGE: {
    path: '/settings/selection-procedure/create',
    param: ':id',
    exact: true,
    label: 'Создание порядка отбора кандидатов',
    component: pages.SelectionProcedureCreatePage,
    credentials: [roles.RZU],
  },
  SELECTION_PROCEDURE_CREATE_ELIMINATION_TESTS_PAGE: {
    path: '/settings/selection-procedure/create',
    label: 'Настройка отборочных испытаний',
    exact: true,
    component: pages.SelectionProcedureCreateEliminationTestsPage,
    credentials: [roles.ROSS],
  },
  SELECTION_PROCEDURE_EDIT_ELIMINATION_TESTS_PAGE: {
    path: '/settings/selection-procedure/create',
    param: ':id',
    exact: true,
    label: 'Настройка отборочных испытаний',
    component: pages.SelectionProcedureCreateEliminationTestsPage,
    credentials: [roles.ROSS],
  },
  SELECTION_PROCEDURE_VIEW_PAGE: {
    path: '/settings/selection-procedure',
    param: ':id',
    exact: true,
    label: 'Порядок отбора кандидатов',
    component: pages.SelectionProcedureViewPage,
    credentials: [roles.RZU, roles.ROSS],
  },

  // pages does not exists yet
  NEWS_AND_EVENT_PAGE: {
    path: '/settings/news-and-events',
    exact: true,
    label: 'Новости и мероприятия',
    component: pages.SettingsPage,
    credentials: EVERYBODY,
  },
  REQUEST_REGISTER: {
    path: '/settings/request-register',
    label: 'Реестр заявок',
    visibleInHeader: true,
    component: pages.SettingsPage,
    credentials: EVERYBODY,
  },
  APPEALS: {
    path: '/settings/appeals',
    label: 'Апелляции',
    visibleInHeader: true,
    component: pages.SettingsPage,
    credentials: EVERYBODY,
  },
  STATISTICS: {
    path: '/settings/statistics',
    label: 'Статистика',
    visibleInHeader: true,
    component: pages.SettingsPage,
    credentials: EVERYBODY,
  },
}

export const profileRoutes: RouteDictionary = {
  notFound: routes.notFound,
  main: {
    path: '/settings/profile',
    label: 'Профиль',
    exact: true,
    component: pages.ScreeningTestProfilePage,
    credentials: [roles.RZU, roles.ROSS, roles.candidate],
  },
  SCREENING_TEST_PROFILE_PAGE: {
    path: '/settings/profile/screening-test',
    label: 'Отборочные испытания',
    exact: true,
    component: pages.ScreeningTestProfilePage,
    credentials: roles.candidate,
  },
}

export const selectionProcedureHashRoutes: HashDictionary = {
  main: {
    path: '/stages',
    exact: true,
    label: 'Этапы отбора',
    credentials: [roles.RZU],
  },
  stages: {
    path: '/stages',
    exact: true,
    label: 'Этапы отбора',
    credentials: [roles.RZU],
  },
  app: {
    path: '/app',
    exact: true,
    label: 'Заявка',
    credentials: [roles.RZU],
  },
  tests: {
    path: '/tests',
    exact: true,
    label: 'Отборочные испытания',
    credentials: [roles.RZU],
  },
}
