const toString = Object.prototype.toString

export const isDate = (obj): obj is Date => {
  return toString.call(obj) === '[object Date]'
}

export const isObject = (obj): obj is Object => {
  return obj !== null && typeof obj === 'object'
}

export const isExist = (obj) => {
  return !(obj === null || typeof obj === 'undefined')
}

export const isPlainObject = (obj: any) => {
  return toString.call(obj) === '[object Object]'
}

export const encode = (str: string) => {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const buildUrl = (url: string, params?: any): string => {
  if (!params) return url
  const parts: Array<string> = []

  Object.keys(params).forEach((item) => {
    const val = params[item]
    if (!isExist(val)) return
    let values: any[] = []
    if (Array.isArray(val)) {
      values = val
      item += '[]'
    } else {
      values = [val]
    }

    values.forEach((val1) => {
      if (isDate(val1)) {
        val1 = val1.toISOString()
      } else if (isPlainObject(val1)) {
        val1 = JSON.stringify(val1)
      }
      parts.push(`${encode(item)}=${encode(val1)}`)
    })
  })

  const serializedParams: string = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

/**
 * 将被拷贝的对象里的属性和方法拷贝到目标对象中
 * @param to 拷贝的目标对象
 * @param from 被拷贝的目标对象
 */
export const extend = <T extends Object, U extends Object>(
  to: T,
  from: U
): T & U => {
  for (let prototype in from) {
    console.log(77777, prototype, from, from[prototype] as any)
    ;(to as T & U)[prototype] = from[prototype] as any
    console.log(9999, (to as any)[prototype])
  }
  console.log(88888, to)

  return to as T & U
}
