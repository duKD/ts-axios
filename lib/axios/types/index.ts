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
  url: string // 请求地址 必选
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
export type axiosPromise<T = any> = Promise<AxiosResponse<T>>
