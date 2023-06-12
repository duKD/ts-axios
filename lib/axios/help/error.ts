import { AxiosRequestConfig, AxiosResponse } from '../types'

// AxiosError参数集合接口
interface AxiosErrorArgs {
  message: string // Error的报错信息
  config: AxiosRequestConfig // request的config配置项
  code?: string | null // 状态码
  request?: any // request实例本身
  response?: AxiosResponse // 响应体
}

// request请求响应出错类
class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | number | null
  request?: any
  response?: AxiosResponse

  constructor(args: AxiosErrorArgs) {
    console.log(1111, args)

    const { message, config, code, request, response } = args
    super(message)
    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/**
 * 创建axios请求错误的信息
 * @param args 参数集合
 */
export function createError(args: AxiosErrorArgs): any {
  const error = new AxiosError(args)

  return error
}
