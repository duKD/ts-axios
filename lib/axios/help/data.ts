import { isPlainObject } from './utils'

export const transformRequest = (data: any): any => {
  if (isPlainObject(data)) return JSON.stringify(data)
  return data
}

/**
 * 尝试转换响应的data数据为JSON对象格式
 * @param data 响应的data数据
 */
export const transformResponse = (data: any): any => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {}
  }
  return data
}
