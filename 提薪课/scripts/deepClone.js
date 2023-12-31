/*
 * @Author: xie392
 * @Date: 2023-09-17 22:59:38
 * @Description: 深拷贝的循环引用问题
 * @See: https://v.douyin.com/iexSuQJj/
 */
const obj =  {
    arr: [1,2,3],
    a: 4
}

obj.sub = obj
obj.arr.push(obj)

function deepClone(value) {
    // WeakMap 可以用来存储对象，因为它可以被垃圾回收
    const cache = new WeakMap()

    function _deepClone(value) {
        if(value === null || typeof value !== 'object') {
            return value
        }

        if(cache.has(value)) {
            return cache.get(value)
        }

        const cloneObj = Array.isArray(value) ? [] : {}
        cache.set(value, cloneObj)
        for(let key in value) {
            if(value.hasOwnProperty(key)) {
                cloneObj[key] = _deepClone(value[key])
            }
        }
        return cloneObj
    }

    return _deepClone(value)
}


const newArr = deepClone(obj)
console.log(newArr.arr !== obj.arr)     // true
console.log(newArr.sub !== obj.sub)     // true
console.log(newArr.arr[3] !== obj)      // true