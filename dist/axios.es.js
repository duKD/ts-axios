var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const toString = Object.prototype.toString;
const isDate = (obj) => {
  return toString.call(obj) === "[object Date]";
};
const isExist = (obj) => {
  return !(obj === null || typeof obj === "undefined");
};
const isPlainObject = (obj) => {
  return toString.call(obj) === "[object Object]";
};
const encode = (str) => {
  return encodeURIComponent(str).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
};
const buildUrl = (url, params) => {
  if (!params)
    return url;
  const parts = [];
  Object.keys(params).forEach((item) => {
    const val = params[item];
    if (!isExist(val))
      return;
    let values = [];
    if (Array.isArray(val)) {
      values = val;
      item += "[]";
    } else {
      values = [val];
    }
    values.forEach((val1) => {
      if (isDate(val1)) {
        val1 = val1.toISOString();
      } else if (isPlainObject(val1)) {
        val1 = JSON.stringify(val1);
      }
      parts.push(`${encode(item)}=${encode(val1)}`);
    });
  });
  const serializedParams = parts.join("&");
  if (serializedParams) {
    const markIndex = url.indexOf("#");
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
const extend = (to, from) => {
  for (let prototype in from) {
    to[prototype] = from[prototype];
  }
  return to;
};
const deepMerge = (...objs) => {
  const result = /* @__PURE__ */ Object.create(null);
  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
};
const isFormData = (val) => {
  return val !== void 0 && val instanceof FormData;
};
const normalizeHeaderName = (header, normalizeHeaderName2) => {
  if (!isPlainObject(header))
    return;
  Object.keys(header).forEach((name) => {
    if (name !== normalizeHeaderName2 && name.toUpperCase() === normalizeHeaderName2.toUpperCase()) {
      header[normalizeHeaderName2] = header[name];
      delete header[name];
    }
  });
};
const processHeaders = (header, data) => {
  normalizeHeaderName(header, "Content-type");
  if (isPlainObject(data)) {
    if (header && !header["Content-type"]) {
      header["Content-type"] = "application/json; charset=utf-8";
    }
  }
  return header;
};
const parseHeaders = (headers) => {
  const parsed = {};
  if (!headers)
    return parsed;
  headers.split("\r\n").forEach((line) => {
    let [key, ...vals] = line.split(":");
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    const val = vals.join(":").trim();
    parsed[key] = val;
  });
  return parsed;
};
function flattenHeaders(headers, method) {
  if (!headers) {
    return headers;
  }
  headers = deepMerge(headers.common, headers[method], headers);
  const methodsToDelete = [
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch",
    "common"
  ];
  methodsToDelete.forEach((key) => {
    delete headers[key];
  });
  return headers;
}
class AxiosError extends Error {
  constructor(args) {
    console.log(1111, args);
    const { message, config, code, request, response } = args;
    super(message);
    __publicField(this, "isAxiosError");
    __publicField(this, "config");
    __publicField(this, "code");
    __publicField(this, "request");
    __publicField(this, "response");
    this.isAxiosError = true;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}
function createError(args) {
  const error = new AxiosError(args);
  return error;
}
function xhr(config) {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = "get",
      headers,
      responseType,
      cancelToken,
      withCredentials,
      onDownloadProgress,
      onUploadProgress,
      timeout = 0
    } = config;
    const handleResponse = (response) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError({
            message: `request failed with status code ${response.status}`,
            config,
            code: null,
            request,
            response
          })
        );
      }
    };
    const request = new XMLHttpRequest();
    if (responseType) {
      request.responseType = responseType;
    }
    if (timeout) {
      request.timeout = timeout;
    }
    if (withCredentials) {
      request.withCredentials = withCredentials;
    }
    if (onDownloadProgress) {
      request.onprogress = onDownloadProgress;
    }
    if (onUploadProgress) {
      request.upload.onprogress = onUploadProgress;
    }
    if (isFormData(data)) {
      delete headers["Content-Type"];
    }
    request.onerror = function() {
      reject(
        createError({
          message: "network error",
          config,
          code: null,
          request
        })
      );
    };
    request.ontimeout = function() {
      reject(
        createError({
          message: `timeout error ${timeout}ms`,
          config,
          code: "econnaborted",
          request
        })
      );
    };
    request.onreadystatechange = function() {
      if (request.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (request.status === 0) {
        return;
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== "text" ? request.response : request.responseText;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      handleResponse(response);
    };
    request.open(method.toUpperCase(), url, true);
    Object.keys(headers).forEach((name) => {
      if (!data && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });
    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        request.abort();
        reject(reason);
      });
    }
    request.send(data);
  });
}
function transform(data, headers, fns) {
  if (!fns) {
    return data;
  }
  if (!Array.isArray(fns)) {
    fns = [fns];
  }
  fns.forEach((fn) => {
    data = fn(data, headers);
  });
  return data;
}
function dispatchRequest(config) {
  throwIfCanCelRequest(config);
  processConfig(config);
  return xhr(config).then((res) => {
    return transformResponseData(res);
  });
}
const processConfig = (config) => {
  config.url = transformUrl(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method);
};
const transformUrl = (config) => {
  const { url, params } = config;
  return buildUrl(url, params);
};
const transformResponseData = (res) => {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
};
const throwIfCanCelRequest = (config) => {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest();
  }
};
class InterceptorManager {
  constructor() {
    __publicField(this, "interceptors");
    this.interceptors = [];
  }
  use(resolved, rejected) {
    this.interceptors.push({
      resolved,
      rejected
    });
    return this.interceptors.length - 1;
  }
  eject(id) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
  forEach(fn) {
    this.interceptors.forEach((item) => {
      if (item) {
        fn(item);
      }
    });
  }
}
const strats = /* @__PURE__ */ Object.create(null);
function defaultStart(val1, val2) {
  return typeof val2 !== "undefined" ? val2 : val1;
}
function fromVal2Strat(val1, val2) {
  if (typeof val2 !== "undefined") {
    return val2;
  }
}
function deepMergeStrat(val1, val2) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== "undefined") {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else {
    return val1;
  }
}
const stratKeysFromVal2 = ["url", "params", "data"];
stratKeysFromVal2.forEach((key) => {
  strats[key] = fromVal2Strat;
});
const stratKeysDeepMerge = ["headers", "auth"];
stratKeysDeepMerge.forEach((key) => {
  strats[key] = deepMergeStrat;
});
function mergeConfig(config1, config2) {
  const config = /* @__PURE__ */ Object.create(null);
  if (!config2) {
    config2 = {};
  }
  for (let key in config2) {
    mergeField(key);
  }
  for (let key in config1) {
    if (!config[key]) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    const strat = strats[key] || defaultStart;
    config[key] = strat(config1[key], config2[key]);
  }
  return config;
}
class Axios {
  constructor(initConfig) {
    __publicField(this, "defaults");
    __publicField(this, "interceptors");
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  request(url, config) {
    if (typeof url === "string") {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }
    config = mergeConfig(this.defaults, config);
    const chainList = [
      {
        resolved: dispatchRequest,
        rejected: void 0
      }
    ];
    this.interceptors.request.forEach((interceptor) => {
      chainList.unshift(interceptor);
    });
    this.interceptors.response.forEach((interceptor) => {
      chainList.push(interceptor);
    });
    let promise = Promise.resolve(config);
    while (chainList.length) {
      const { resolved, rejected } = chainList.shift();
      promise = promise.then(resolved, rejected);
    }
    return promise;
  }
  get(url, config) {
    return this._requestMethodWithoutData("get", url, config);
  }
  // DELETE请求
  delete(url, config) {
    return this._requestMethodWithoutData("delete", url, config);
  }
  // HEAD请求
  head(url, config) {
    return this._requestMethodWithoutData("head", url, config);
  }
  // OPTIONS请求
  options(url, config) {
    return this._requestMethodWithoutData("options", url, config);
  }
  // POST请求
  post(url, data, config) {
    return this._reqeustMethodWithData("post", url, data, config);
  }
  // PUT请求
  put(url, data, config) {
    return this._reqeustMethodWithData("put", url, data, config);
  }
  // PATCH请求
  patch(url, data, config) {
    return this._reqeustMethodWithData("patch", url, data, config);
  }
  // 封装get、delete、head、options请求方法中的公共部分，返回一个request方法
  _requestMethodWithoutData(method, url, config) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    );
  }
  // 封装post、put、patch请求方法中的公共部分，返回一个request方法
  _reqeustMethodWithData(method, url, data, config) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    );
  }
}
const transformRequest = (data) => {
  if (isPlainObject(data))
    return JSON.stringify(data);
  return data;
};
const transformResponse = (data) => {
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (error) {
    }
  }
  return data;
};
const defaults = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  transformRequest: [
    function(data, headers) {
      processHeaders(headers, data);
      return transformRequest(data);
    }
  ],
  transformResponse: [
    function(resData) {
      return transformResponse(resData);
    }
  ]
  //   validateStatus(status: number): boolean {
  //     return status >= 200 && status < 300
  //   }
};
const methodsNoData = ["delete", "get", "head", "options"];
methodsNoData.forEach((method) => {
  defaults.headers[method] = {};
});
const methodsWithData = ["post", "put", "patch"];
methodsWithData.forEach((method) => {
  defaults.headers[method] = {};
});
class Cancel {
  constructor(message) {
    __publicField(this, "message");
    this.message = message;
  }
}
function isCancel(val) {
  return val instanceof Cancel;
}
class CancelToken {
  constructor(executor) {
    __publicField(this, "promise");
    __publicField(this, "reason");
    let resolvePromise;
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    executor((message) => {
      if (this.reason) {
        return;
      }
      this.reason = new Cancel(message);
      resolvePromise(this.reason);
    });
  }
  throwIfRequest() {
    console.log(6666666, this.reason);
    if (this.reason) {
      throw "the token has been Requested";
    }
  }
  static source() {
    let cancel;
    const token = new CancelToken((c) => {
      cancel = c;
    });
    return {
      cancel,
      token
    };
  }
}
function createInstance(config) {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  return instance;
}
const axios = createInstance(defaults);
axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config));
};
axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;
export {
  axios as default
};
