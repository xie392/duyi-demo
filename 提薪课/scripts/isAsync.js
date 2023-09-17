/*
 * @Author: xie392
 * @Date: 2023-09-15 18:04:22
 * @Description: 判断是否是异步函数
 * @See: https://v.douyin.com/iem4sRs7/
 */
function isAsync(fn) {
    return fn[Symbol.toStringTag] === 'AsyncFunction'
}

console.log(isAsync(async () => {}))   // true
console.log(isAsync(() => {}))         // false