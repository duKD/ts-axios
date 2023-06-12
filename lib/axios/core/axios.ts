import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  // DELETE请求
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  // HEAD请求
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  // OPTIONS请求
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  // POST请求
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithData('post', url, data, config)
  }

  // PUT请求
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithData('put', url, data, config)
  }

  // PATCH请求
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithData('patch', url, data, config)
  }

  // 封装get、delete、head、options请求方法中的公共部分，返回一个request方法
  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  // 封装post、put、patch请求方法中的公共部分，返回一个request方法
  _reqeustMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
