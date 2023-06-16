export default class Cancel {
    message?: string;
    constructor(message?: string);
}
/**
 * 判断是否为实例的类是否为Cancel类
 * @param val 需要判断的实例
 */
export declare function isCancel(val: any): boolean;
