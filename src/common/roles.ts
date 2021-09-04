import { Credentials } from '../models'
import { Dictionary } from '../types/types'

interface RoleDictionary extends Dictionary<Credentials> {}

const roles: RoleDictionary = {
  ROSS: {
    name: 'rossotrudnichestvo',
    displayName: 'Россотрудничество',
  },
  RZU: {
    name: 'staff',
    displayName: 'Сотрудники',
  },
  candidate: {
    name: 'candidate',
    displayName: 'Кандидат',
  },
}

export const EVERYBODY = Object.keys(roles).map((key) => roles[key])

export function allButOne(role) {
  return [
    ...EVERYBODY.slice(0, EVERYBODY.indexOf(role)),
    ...EVERYBODY.slice(EVERYBODY.indexOf(role) + 1),
  ]
}

export default roles
