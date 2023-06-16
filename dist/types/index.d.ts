export type Method = 'get' | 'GET' | 'delete' | 'Delete' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';
export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    cancelToken?: CancelToken;
    /** 是否发送跨域的 */
    withCredentials?: boolean;
    /** XSRF的cookie的name */
    xsrfCookieName?: string;
    /** XSRF发送的header的name */
    xsrfHeaderName?: string;
    /**
     * 允许在请求数据发送到服务器之前对其进行更改
     * 这只适用于请求方法’PUT’，’POST’和’PATCH’
     */
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    /**
     * 允许在 then / catch之前对响应数据进行更改
     */
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    /** 监听下载的进度事件 */
    onDownloadProgress?: (e: ProgressEvent) => void;
    /** 监听上传的进度事件 */
    onUploadProgress?: (e: ProgressEvent) => void;
    timeout?: number;
}
/**
 * 响应数据体格式
 */
export type AxiosResponse<T = any> = {
    /**
     * 响应的data数据
     */
    data: T;
    /**
     * 响应的状态码
     */
    status: number;
    /**
     * response响应的数据文本
     */
    statusText: string;
    /**
     * response的返回的header
     */
    headers: any;
    /**
     * request请求的config配置项
     */
    config: AxiosRequestConfig;
    /**
     * request实例本身
     */
    request: any;
};
/**
 * 返回一个Promise对象
 */
export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;
/**
 * 定义reques请求的Error
 */
export interface AxiosError extends Error {
    /**
     * 是否为Axios的报错
     */
    isAxiosError: boolean;
    /**
     * request请求的config配置项
     */
    config: AxiosRequestConfig;
    /**
     * 响应的错误状态码
     */
    code?: string | null;
    /**
     * request实例本身
     */
    request?: any;
    /**
     * 响应体
     */
    response?: AxiosResponse;
}
/**
 * Axios的方法接口
 */
export interface Axios {
    /**
     * 默认配置项
     */
    defaults: AxiosRequestConfig;
    /**
     * 拦截器
     */
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    /**
     * 发起request请求，是其他方式的请求的基础
     * @param config 请求的config配置项
     */
    request<T = any>(url: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}
/**
 * Axios对外使用的接口，继承Axios接口
 */
export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}
export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
    CancelToken: CancelTokenStatic;
    Cancel: CancelStatic;
    isCancel: (arg: any) => boolean;
}
/**
 * 拦截器的泛型接口
 */
export interface AxiosInterceptorManager<T> {
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;
    eject(id: number): void;
}
/**
 * 拦截器的resolve接口
 */
export interface ResolvedFn<T> {
    (val: T): T | Promise<T>;
}
/**
 * 拦截器的reject接口
 */
export interface RejectedFn {
    (error: any): any;
}
/**
 * config和响应数据的处理
 */
export interface AxiosTransformer {
    (data: any, headers?: any): any;
}
export interface CancelToken {
    promise: Promise<Cancel>;
    reason: Cancel;
    throwIfRequest: () => void;
}
export interface Canceler {
    (message?: string): void;
}
export interface CancelExecutor {
    (cancel: Canceler): void;
}
export interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}
export interface CancelTokenStatic {
    source(): CancelTokenSource;
    new (executor: CancelExecutor): CancelToken;
}
export interface Cancel {
    message?: string;
}
export interface CancelStatic {
    new (message?: string): Cancel;
}
