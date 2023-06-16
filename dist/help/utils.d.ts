export declare const isDate: (obj: any) => obj is Date;
export declare const isObject: (obj: any) => obj is Object;
export declare const isExist: (obj: any) => boolean;
export declare const isPlainObject: (obj: any) => boolean;
export declare const encode: (str: string) => string;
export declare const buildUrl: (url: string, params?: any) => string;
/**
 * 将被拷贝的对象里的属性和方法拷贝到目标对象中
 * @param to 拷贝的目标对象
 * @param from 被拷贝的目标对象
 */
export declare const extend: <T extends Object, U extends Object>(to: T, from: U) => T & U;
/**
 * 深度拷贝对象
 * @param objs 接受需要拷贝的对象，有相同key时后者覆盖前者，使用...接受不定个数的拷贝对象
 */
export declare const deepMerge: (...objs: any[]) => any;
/**
 * 返回一个布尔值判断当前传入的变量是否为URLSearchParams类型对象
 * @param val 需要判断是否为URLSearchParams对象的变量
 */
export declare const isURLSearchParams: (val: any) => val is URLSearchParams;
export declare const isFormData: (val: any) => val is FormData;
