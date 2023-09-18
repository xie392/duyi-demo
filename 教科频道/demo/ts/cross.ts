/*
 * @Author: xie392
 * @Date: 2023-09-18 22:42:10
 * @Description: 联合类型和交叉类型
 * @See: https://v.douyin.com/ieQGMWmG/
 */
type U = { a: number; b: number } | { a: number; c: number }
type I = { a: number; b: number } & { a: number; c: number }

const u: U = {
    a: 1,
    b: 2,
    c: 4
}

// u.c  // Error: 类型“{ a: number; b: number; }”上不存在属性“c”。

const i: I = {
    a: 1,
    b: 2,
    c: 4
}

// i.c  // 4