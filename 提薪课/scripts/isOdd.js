/*
 * @Author: xie392
 * @Date: 2023-09-14 18:36:44
 * @Description: 判断是否是奇数
 * @See: https://v.douyin.com/ieaXLmWG/
 */

function isOdd(num) {
    return num % 2 === 1 || num % 2 === -1;
}
console.log(isOdd(3));      // true
console.log(isOdd(-1));     // true
console.log(isOdd(1.5));    // false
