import { AxiosRequestConfig } from './types'
import { processHeaders } from './help/headers'
import { transformRequest, transformResponse } from './help/data'

/**
 * 默认配置项
 */
const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    function (data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function (resData: any): any {
      return transformResponse(resData)
    }
  ]

  //   validateStatus(status: number): boolean {
  //     return status >= 200 && status < 300
  //   }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach((method) => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach((method) => {
  defaults.headers[method] = {}
})

export default defaults
