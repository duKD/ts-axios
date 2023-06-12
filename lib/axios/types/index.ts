export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string // 请求地址 必选
  /* 注 ? 表示可选 */
  method?: Method // 请求方法 可选
  data?: any // post、patch 等类型请求的数据 可选
  params?: any // post、patch 等类型请求的数据 可选
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

/**
 * 响应数据体格式
 */
export type AxiosResponse<T = any> = {
  /**
   * 响应的data数据
   */
  data: T
  /**
   * 响应的状态码
   */
  status: number
  /**
   * response响应的数据文本
   */
  statusText: string
  /**
   * response的返回的header
   */
  headers: any
  /**
   * request请求的config配置项
   */
  config: AxiosRequestConfig
  /**
   * request实例本身
   */
  request: any
}

/**
 * 返回一个Promise对象
 */
export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>

/**
 * 定义reques请求的Error
 */
export interface AxiosError extends Error {
  /**
   * 是否为Axios的报错
   */
  isAxiosError: boolean
  /**
   * request请求的config配置项
   */
  config: AxiosRequestConfig
  /**
   * 响应的错误状态码
   */
  code?: string | null
  /**
   * request实例本身
   */
  request?: any
  /**
   * 响应体
   */
  response?: AxiosResponse
}

/**
 * Axios的方法接口
 */
export interface Axios {
  /**
   * 默认配置项
   */
  defaults: AxiosRequestConfig

  /**
   * 拦截器
   */
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  /**
   * 发起request请求，是其他方式的请求的基础
   * @param config 请求的config配置项
   */
  request<T = any>(url: any, config?: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>
}

/**
 * Axios对外使用的接口，继承Axios接口
 */
export interface AxiosInstance extends Axios {
  // 利用重载
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 拦截器的泛型接口
 */
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

/**
 * 拦截器的resolve接口
 */
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

/**
 * 拦截器的reject接口
 */
export interface RejectedFn {
  (error: any): any
}
