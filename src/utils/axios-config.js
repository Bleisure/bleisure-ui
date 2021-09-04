import axios from 'axios'
import { SERVER_API_URL } from '../common/urls'

const configureAxios = () => {
  axios.defaults.baseURL = SERVER_API_URL

  axios.interceptors.request.use(
    async (config) => {
      config.headers['AU-TOKEN'] = `Bearer ${localStorage.getItem('userToken')}`
      return { ...config, metadata: { startTime: Date.now() } }
    },
    (error) => Promise.reject(error),
  )
}

export default configureAxios
