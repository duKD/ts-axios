import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './help/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()

  const instance = Axios.prototype.request.bind(context)

  instance.prototype = context

  return instance
}

const axios = createInstance()

export default axios
