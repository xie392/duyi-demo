---
  updated: 2024-12-21
  title:  JS 实现函数重载
  author: xie392
  url: https://v.douyin.com/ie9cwAE4/
---

## 案例代码

```javascript
/**
 * 创建函数重载
 * @param  {...any} args  参数
 * @returns 
 */
function createOverload(...args) {
    const callMap = new Map()

    function overload(...args) {
        const key = args.map(arg=> typeof arg).join(',')
        const fn = callMap.get(key)

        if(fn) {
            return fn.apply(this, args)
        }
        throw new TypeError('fn not found')
    }

    overload.addImpl = function(...args) {
        const fn = args.pop()
        if(typeof fn !== 'function') {
            throw new TypeError('fn must be a function')
        }
        callMap.set(args.join(','), fn)
    }

    return overload
}

/**
 * Tests
 * 
 */
function test(index) {
    console.log('index:',index)
}

const testOverload = createOverload()

testOverload.addImpl('number',test)
testOverload.addImpl('string',(name)=>{
    console.log("name:",name);
})
testOverload.addImpl('string','string',(name,sex)=>{
    console.log("name：",name,"sex：",sex);
})

testOverload(10)
testOverload('老六')
testOverload('张三','男')
```

输出结果：

```plaintext
index: 10
name: 老六
name： 张三 sex： 男
```