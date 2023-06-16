import { AxiosInterceptorManager, RejectedFn, ResolvedFn } from '../types';
interface Interceptor<T> {
    resolved: ResolvedFn<T>;
    rejected?: RejectedFn;
}
export default class InterceptorManager<T> implements AxiosInterceptorManager<T> {
    private interceptors;
    constructor();
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn | undefined): number;
    eject(id: number): void;
    forEach(fn: (item: Interceptor<T>) => void): void;
}
export {};
