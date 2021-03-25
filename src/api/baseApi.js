import axios from 'axios'
import { getToken } from '../configs/credentials'

const http = axios.create({
  baseURL: process.env.REACT_APP_URL_API
})

function configRequestSuccess(config) {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

function configRequestError(error) {
  return Promise.reject(error)
}

http.interceptors.request.use(
  configRequestSuccess,
  configRequestError
)

const baseApi = {
  get: (endpoint) => http.get(endpoint).then((response) => response),
  post: (endpoint, payload) => http.post(endpoint, payload).then((response) => response),
  postForm: (endpoint, file) => {
		const formData = new FormData()
		formData.append('file', file)
		return http
              .post(endpoint, formData,{
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              .then((response) => response)
	},
  put: (endpoint, payload) => http.put(endpoint, payload).then((response) => response),
  delete: (endpoint) => http.delete(endpoint).then((response) => response),
}

export default baseApi
