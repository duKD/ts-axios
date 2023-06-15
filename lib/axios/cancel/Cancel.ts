export default class Cancel {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

/**
 * 判断是否为实例的类是否为Cancel类
 * @param val 需要判断的实例
 */
export function isCancel(val: any): boolean {
  return val instanceof Cancel
}
