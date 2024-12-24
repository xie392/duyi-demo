---
  updated: 2024-12-21
  title:  TS 中的递归类型推断
  author: xie392
  url: https://v.douyin.com/ieQtfv3e/
---

## 案例代码

```typescript
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
```
