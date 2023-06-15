import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

// request和response拦截器对象接口
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

// 链式调用执行调用的接口
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig

  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    // 拦截器
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    // 合并默认的config和自定义的config
    config = mergeConfig(this.defaults, config)

    const chainList: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach((interceptor) => {
      chainList.unshift(interceptor)
    })

    this.interceptors.response.forEach((interceptor) => {
      chainList.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chainList.length) {
      const { resolved, rejected } = chainList.shift()
      promise = promise.then(resolved, rejected)
    }

    return promise
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
