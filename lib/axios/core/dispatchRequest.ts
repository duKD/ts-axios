import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import xhr from '../core/xhr'
import { buildUrl } from '../help/utils'
import { flattenHeaders } from '../help/headers'
import transform from './transform'

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  throwIfCanCelRequest(config)
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

const processConfig = (config: AxiosRequestConfig) => {
  // headers 处理 要在 data 处理之前
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method)
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildUrl(url, params)
}

const transformResponseData = (res: AxiosResponse) => {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

const throwIfCanCelRequest = (config: AxiosRequestConfig) => {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}
