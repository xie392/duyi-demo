/*
 * @Author: xie392
 * @Date: 2023-09-18 22:32:15
 * @Description: 联合类型转交叉类型
 * @See: https://v.douyin.com/ieQGrasM/
 */
type UnionToIntersction<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never

type test = { a: string } | { b: number } | { c: boolean }

type test2 = UnionToIntersction<test> // { a: string } & { b: number } & { c: boolean }

