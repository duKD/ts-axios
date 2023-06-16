import { parseHeaders } from '../help/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { createError } from '../help/error'
import { isFormData } from '../help/utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      cancelToken,
      withCredentials,
      onDownloadProgress,
      onUploadProgress,
      timeout = 0
    } = config

    const handleResponse = (response: AxiosResponse) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError({
            message: `request failed with status code ${response.status}`,
            config,
            code: null,
            request,
            response
          })
        )
      }
    }

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    // 添加监听下载进度的事件
    if (onDownloadProgress) {
      request.onprogress = onDownloadProgress
    }

    // 添加监听上传进度的事件
    if (onUploadProgress) {
      request.upload.onprogress = onUploadProgress
    }

    // 判断request的data类型，是FormData类型的对象数据，则删除Content-Type的header头信息，让浏览器自行添加
    if (isFormData(data)) {
      delete headers['Content-Type']
    }

    request.onerror = function () {
      reject(
        createError({
          message: 'network error',
          config,
          code: null,
          request
        })
      )
    }

    request.ontimeout = function () {
      reject(
        createError({
          message: `timeout error ${timeout}ms`,
          config,
          code: 'econnaborted',
          request
        })
      )
    }
    request.onreadystatechange = function () {
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
      /**
       * 在请求完成前，status 的值为 0。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为 0
       * 网络错误 和 timeout 要 跳出 处理
       */
      if (request.status === 0) {
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
      handleResponse(response)
    }

    request.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach((name) => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)
  })
}
