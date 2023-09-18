/*
 * @Author: xie392
 * @Date: 2023-09-18 12:35:43
 * @Description: Set 的妙用
 * @See: https://v.douyin.com/iexEs7po/
 */

/**
 * 两个数组的并集、交集、差集
 * 不能出现重复选项，得到的结果是一个新数组
 */
const arr1 = [32, 22, 55, 33, 11, 33, 5]
const aee2 = [22, 55, 77, 88, 88, 99, 99]

// 并集
const union = [...new Set([...arr1, ...aee2])]

// 交集
const intersection = [...new Set(arr1.filter(x => aee2.includes(x)))]

// 差集
const difference = [...new Set(arr1.filter(x => !aee2.includes(x)))]

console.log(union)
console.log(intersection)
console.log(difference)
