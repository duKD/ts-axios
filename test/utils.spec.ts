import { describe, expect, it } from 'vitest'
import { isDate, isObject, isExist, buildUrl } from '../lib/axios/help/utils'

describe('utils test----', () => {
  it('isDate test ', () => {
    const date = new Date()
    expect(isDate(date)).toBeTruthy()
  })

  it('isObject test ', () => {
    let obj: any = {
      name: 'kd'
    }
    expect(isObject(obj)).toBeTruthy()
    obj = null
    expect(isObject(obj)).not.toBeTruthy()
    obj = undefined
    expect(isObject(obj)).not.toBeTruthy()
    obj = function () {}
    expect(isObject(obj)).not.toBeTruthy()
  })

  it('isExist test ', () => {
    let obj: any = {
      name: 'kd'
    }
    expect(isExist(obj)).toBeTruthy()
    obj = undefined
    expect(isExist(obj)).toBe(false)
    obj = null
    expect(isExist(obj)).toBe(false)
  })

  it('buildUrl test ', () => {
    const baseUrl = 'http://localhost:3000/api'

    expect(buildUrl(baseUrl)).toBe(baseUrl)
    let params: Object = {
      name: 'kd',
      age: 12
    }
    expect(buildUrl(baseUrl, params)).toBe(baseUrl + '?name=kd&age=12')
    params = {
      name: 'kd',
      list: ['a', 'b']
    }
    expect(buildUrl(baseUrl, params)).toBe(
      baseUrl + '?name=kd&list[]=a&list[]=b'
    )
    params = {
      name: 'kd',
      list: ['a', 'b']
    }
    expect(buildUrl(baseUrl + '#/hash', params)).toBe(
      baseUrl + '?name=kd&list[]=a&list[]=b'
    )

    params = {
      foo: '@:$ ,',
      bar: null
    }
    expect(buildUrl(baseUrl, params)).toBe(baseUrl + '?foo=@:$+,')

    params = {
      name: 'kd',
      age: 12
    }
    expect(buildUrl(baseUrl + '?from=1', params)).toBe(
      baseUrl + '?from=1&name=kd&age=12'
    )

    const date = new Date()

    params = {
      date: date
    }
    expect(buildUrl(baseUrl, params)).toBe(
      baseUrl + '?date=' + date.toISOString()
    )

    const obj = {
      name: 'kd'
    }
    params = {
      obj: obj
    }
    expect(decodeURIComponent(buildUrl(baseUrl, params))).toBe(
      baseUrl + '?obj=' + JSON.stringify(obj)
    )
  })
})
