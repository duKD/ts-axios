import { Method } from '../types';
export declare const normalizeHeaderName: (header: any, normalizeHeaderName: string) => void;
export declare const processHeaders: (header: any, data: any) => any;
export declare const parseHeaders: (headers: string) => Object;
/**
 * 扁平化合并headers里的所有配置项
 * @param headers request请求里的config的headers
 * @param method request请求里的method方法
 */
export declare function flattenHeaders(headers: any, method: Method): any;
