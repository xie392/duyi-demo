---
  updated: 2024-12-21
  title:  TS 中的重载
  author: xie392
  url: https://v.douyin.com/ie9MhaTH/
---

## 案例代码

```typescript
function message(option: object): void
function message(text: string, onclose?: Function): void
function message(text:string,...args:any[]): void

function message(params: string | object,...args:any[]): void {
    console.log(params,args)
}

message({ text: 'hello' })
message('hello')
message('hello',function(){})
```
