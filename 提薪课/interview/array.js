/*
 * @Author: xie392
 * @Date: 2023-09-15 19:48:58
 * @Description: 对象数组去重
 * @See: https://v.douyin.com/iemWLVwD/
 */
const arr = [
    { a: 1, b: 2 },
    { b: 2, a: 1 },
    { a: 1, b: 2, c: { a: 1, b: 2 } },
    { b: 2, a: 1, c: { b: 2, a: 1 } },
]
/**
 * 判断是否是对象
 * @param {*} obj    
 * @returns 
 */
const isObject = (obj) => typeof obj === 'object' && obj !== null

const newArr = [...arr]
for (let i = 0; i < newArr.length; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
        if (equals(newArr[i], newArr[j])) {
            newArr.splice(j, 1)
            j--
        }
    }
}

/**
 * 对比两个值是否相等
 * @param {*} a     对象或字符
 * @param {*} b     对象或字符
 * @returns 
 */
function equals(a, b) {
    if(!isObject(a) || !isObject(b)) return Object.is(a, b)
    if(a === b) return true
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if(keysA.length !== keysB.length) return false

    for(const key of keysA) {
        if(!keysB.includes(key)) return false
        const res = equals(a[key], b[key])
        if(!res) return false
    }
    return true
}

console.log(newArr)