import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://192.168.0.13:4000',
})

api.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
api.interceptors.response.use((response) => {
  if (response.data.error) {
    throw response
  } else {
    return response
  }
})
export default api
