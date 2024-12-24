---
  updated: 2024-12-21
  title:  使用 infer 封装通用类型工具
  author: xie392
  url: https://v.douyin.com/ieQtm3cC/
---

## 案例代码

```typescript
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
```
