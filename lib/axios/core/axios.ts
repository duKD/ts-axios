import { AxiosRequestConfig, AxiosResponse, axiosPromise } from '../types'
import xhr from './xhr'
import { buildUrl } from '../help/utils'
import { transformRequest, transformResponse } from '../help/data'
import { processHeaders } from '../help/headers'

export default function axios(config: AxiosRequestConfig): axiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

const processConfig = (config: AxiosRequestConfig) => {
  // headers 处理 要在 data 处理之前
  config.headers = transformHeaders(config)
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildUrl(url, params)
}

const transformRequestData = (config: AxiosRequestConfig): any => {
  const { data } = config
  return transformRequest(data)
}

const transformHeaders = (config: AxiosRequestConfig): any => {
  const { data, headers = {} } = config
  return processHeaders(headers, data)
}

const transformResponseData = (res: AxiosResponse) => {
  res.data = transformResponse(res.data)
  return res
}
