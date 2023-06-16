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
    ;(to as T & U)[prototype] = from[prototype] as any
  }

  return to as T & U
}

/**
 * 深度拷贝对象
 * @param objs 接受需要拷贝的对象，有相同key时后者覆盖前者，使用...接受不定个数的拷贝对象
 */
export const deepMerge = (...objs: any[]): any => {
  const result = Object.create(null)

  objs.forEach((obj) => {
    // 当obj为真，即不为空值或空对象时
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key]

        if (isPlainObject(val)) {
          // 判断是解决result[key]为undefined时，减少一次遍历 -- 优化代码
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

/**
 * 返回一个布尔值判断当前传入的变量是否为URLSearchParams类型对象
 * @param val 需要判断是否为URLSearchParams对象的变量
 */
export const isURLSearchParams = (val: any): val is URLSearchParams => {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export const isFormData = (val: any): val is FormData => {
  return val !== undefined && val instanceof FormData
}
