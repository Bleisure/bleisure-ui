import camelize from 'camelize'
import { ServerResponse } from '../services/api/types'

export default <T, R = T>(r: ServerResponse<T>): R => {
  if (!r || (r && (!r.status || !r.data))) {
    throw r
  }
  return camelize(r.data)
}
