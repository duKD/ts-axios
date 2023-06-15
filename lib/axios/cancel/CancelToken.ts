import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

export default class CancelToken {
  promise: Promise<Cancel>
  reason: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: (value: Cancel | PromiseLike<Cancel>) => void
    this.promise = new Promise<Cancel>((resolve) => {
      resolvePromise = resolve
    })
    executor((message?: string) => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequest() {
    console.log(6666666, this.reason)

    if (this.reason) {
      throw 'the token has been Requested'
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken((c) => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
