import { AxiosRequestConfig, AxiosResponse } from '../types';
interface AxiosErrorArgs {
    message: string;
    config: AxiosRequestConfig;
    code?: string | null;
    request?: any;
    response?: AxiosResponse;
}
/**
 * 创建axios请求错误的信息
 * @param args 参数集合
 */
export declare function createError(args: AxiosErrorArgs): any;
export {};
