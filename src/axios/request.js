import axios from 'axios'
import router from '../router/index'

const requestAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(
  null,
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      router.push('/auth?message=auth')
    }
    return Promise.reject(error)
  }
)

export default requestAxios
