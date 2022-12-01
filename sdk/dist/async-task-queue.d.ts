export declare type AsyncTask<T = void> = () => Promise<T>;
/**
 * 将异步任务推送到异步队列，队列内任务先进先出，依次执行，执行完成后通过
 * Promise.resolve 返回执行结果
 * @param task 传参不能是 `async () => {}` 所定义的异步函数，
 * 只能使用明确的 `() => Promise<T> | T` 形式，避免转义时微任务被提前执行
 */
export declare const push: <T>(task: AsyncTask<T>, name?: string) => Promise<T>;
//# sourceMappingURL=async-task-queue.d.ts.map