import { AxiosRequestConfig } from '../types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', params } = config

  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
