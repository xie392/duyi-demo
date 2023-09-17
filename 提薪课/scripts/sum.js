/*
 * @Author: xie392
 * @Date: 2023-09-17 17:00:29
 * @Description: 计算大数之和
 * @See: https://v.douyin.com/ie9WdJgN/
 */
/**
 * @description 计算大数之和
 * 
 * @param {string} a
 * @param {string} b
 * @return {string}
 * @example
 * sum('111', '19')  // '130'
 */
function sum(a, b) {
    // 最大位数
    const len = Math.max(a.length, b.length)

    // 不够位数前面补0
    a = a.padStart(len, '0')      // 1 1 1
    b = b.padStart(len, '0')      // 0 1 9

    // 进位
    let carry = 0
    // 结果
    let result = ''

    // 从后面往前遍历
    for (let i = len - 1; i >= 0 ; i--) {
        const sum = +a[i] + +b[i] + carry
        // 字符不断累加 
        // i = 2, sum = 1 + 9 + 0 = 10, result = 10 % 10 + '' = '0', carry = 1
        // i = 1, sum = 1 + 1 + 1 = 3, result = 3 % 10  + '0'= '30', carry = 0
        // i = 0, sum = 1 + 0 + 0 = 1, result = 1 % 10 + '30' = '130', carry = 1
        // 最终结果为 130
        result = sum %10 + result
        // 满 10 进 一
        carry = Math.floor(sum / 10)
    }

    // 如果还有进位
    if (carry > 0) {
        result = carry + result
    }

    return result
}

console.log(sum('111','19'))
console.log(sum('111111111111111111111119999', '911111111111111111111191111'))
