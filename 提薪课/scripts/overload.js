/*
 * @Author: xie392
 * @Date: 2023-09-17 17:39:37
 * @Description: JS 实现函数重载
 * @See: https://v.douyin.com/ie9cwAE4/
 */

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


