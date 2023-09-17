import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_MOCK_URL as string,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('request error: ', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('response error: ', error)
    return Promise.reject(error)
  }
)

export default service
