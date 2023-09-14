/**
 * 判断奇偶性
 * 
 * @see: https://v.douyin.com/ieaXLmWG/
 * @param {Number} num
 * @returns {Boolean}
 */
function isOdd(num) {
    return num % 2 === 1 || num % 2 === -1;
}
console.log(isOdd(3));      // true
console.log(isOdd(-1));     // true
console.log(isOdd(1.5));    // false
