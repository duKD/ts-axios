import { isPlainObject, deepMerge } from '../help/utils'
import { Method } from '../types'

export const normalizeHeaderName = (
  header: any,
  normalizeHeaderName: string
): void => {
  if (!isPlainObject(header)) return
  Object.keys(header).forEach((name) => {
    if (
      name !== normalizeHeaderName &&
      name.toUpperCase() === normalizeHeaderName.toUpperCase()
    ) {
      header[normalizeHeaderName] = header[name]
      delete header[name]
    }
  })
}

export const processHeaders = (header: any, data: any) => {
  normalizeHeaderName(header, 'Content-type')
  if (isPlainObject(data)) {
    if (header && !header['Content-type']) {
      header['Content-type'] = 'application/json; charset=utf-8'
    }
  }
  return header
}

export const parseHeaders = (headers: string) => {
  const parsed: Object = {}
  if (!headers) return parsed
  // 每一个是通过\r\n来进行换行的，所以通过这个分割
  headers.split('\r\n').forEach((line: string): void => {
    // 分割成键值对
    let [key, ...vals] = line.split(':')
    // key值转为小写
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }

    const val = vals.join(':').trim()

    parsed[key] = val
  })

  return parsed
}

/**
 * 扁平化合并headers里的所有配置项
 * @param headers request请求里的config的headers
 * @param method request请求里的method方法
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  // 扁平化合并headers里的所有配置项
  // 第一个是深度拷贝公共的headers，第二个是深度拷贝对应请求特有的，第三个是深度拷贝直接写在headers里的
  headers = deepMerge(headers.common, headers[method], headers)

  /**
   * 需要删除的headers里的key值
   */
  const methodsToDelete: string[] = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ]
  // 删除不必要的headers里的键值对
  methodsToDelete.forEach((key) => {
    delete headers[key]
  })

  return headers
}
