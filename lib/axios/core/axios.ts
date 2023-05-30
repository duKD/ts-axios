import { AxiosRequestConfig } from '../types'
import xhr from './xhr'
import { buildUrl } from '../help/utils'

export default function axios(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config)
}

const processConfig = (config: AxiosRequestConfig) => {
  transformUrl(config)
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildUrl(url, params)
}
