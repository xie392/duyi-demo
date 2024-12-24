---
  updated: 2024-12-21
  title: 使用泛型和keyof约束参数
  author: xie392
  url: https://v.douyin.com/ie9Tnc5T/
---

## 案例代码

```typescript
const cat = {
    name: 'Kitty',
    age: 2
}

// 泛型约束 K 必须是对象的某个属性
function handler<T extends object, K extends keyof T>(obj:T,prop:K) {}

// handler(cat,'s')  // error
handler(cat,'name')  // ok
```
