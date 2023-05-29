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
