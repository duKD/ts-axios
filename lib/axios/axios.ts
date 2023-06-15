import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './help/utils'
import defaultConfig from './defaults'
import mergeConfig from './core/mergeConfig'
import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)
  // 拷贝Axios实例上的方法到instance中
  extend(instance, context)

  return instance
}

const axios = createInstance(defaultConfig)

axios.create = function (config?: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaultConfig, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
