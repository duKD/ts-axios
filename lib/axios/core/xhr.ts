import { parseHeaders } from '../help/headers'
import { AxiosRequestConfig, axiosPromise, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): axiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.onreadystatechange = function () {
      console.log('onreadystatechange------', request.readyState)
      /**
      * 0	UNSENT	代理被创建，但尚未调用 open() 方法。
        1	OPENED	open() 方法已经被调用。
        2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
        3	LOADING	处理中；responseText 属性已经包含部分数据。
        4	DONE	操作已完成。
      */
      if (request.readyState !== XMLHttpRequest.DONE) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    request.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach((name) => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
