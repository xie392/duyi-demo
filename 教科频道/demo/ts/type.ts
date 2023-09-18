/*
 * @Author: xie392
 * @Date: 2023-09-18 22:53:47
 * @Description: TS 中的递归类型推断
 * @See: https://v.douyin.com/ieQtfv3e/
 */
type Curried<T, K> = T extends []
    ? () => K
    : T extends [infer AGR]
    ? (params: AGR) => K
    : T extends [infer AGR, ...infer REST]
    ? (params: AGR) => Curried<REST, K>
    : never

declare function curry<T extends any[], K>(fn: (...args: T) => K): Curried<T, K>

function sum(a: string, b: number, c:object) {
    return a + b
}

const curryFn = curry(sum)

curryFn('sss')(333)({a:1})