import { isPlainObject } from '../help/utils'

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
