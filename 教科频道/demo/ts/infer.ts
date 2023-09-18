/*
 * @Author: xie392
 * @Date: 2023-09-18 23:03:22
 * @Description: 使用 infer 封装通用类型工具
 * @See: https://v.douyin.com/ieQn11oW/
 */
type sum = (a:number, b: number) => number
type concat = (a:any[], b:any[] ) => any[]

// 类似于 ReturnType<T>
// infer 推断
type Return<T> = T extends (...args:any[]) => infer K ? K : T

let sumResult: ReturnType<sum>     // number
let concatResult: Return<concat>   // any[]


// 例子
type PromiseType<T> = T extends Promise<infer K> ? PromiseType<K> : T
type pt = PromiseType<Promise<Promise<string>>>  // string
