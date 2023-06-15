import { AxiosInterceptorManager, RejectedFn, ResolvedFn } from '../types'

// 拦截器的成功和失败处理函数
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T>
  implements AxiosInterceptorManager<T>
{
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn | undefined): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  forEach(fn: (item: Interceptor<T>) => void) {
    this.interceptors.forEach((item) => {
      if (item) {
        fn(item)
      }
    })
  }
}
