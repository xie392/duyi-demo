/*
 * @Author: xie392
 * @Date: 2023-09-17 18:03:24
 * @Description: 使用泛型和keyof约束参数
 * @See: https://v.douyin.com/ie9Tnc5T/
 */

const cat = {
    name: 'Kitty',
    age: 2
}

// 泛型约束 K 必须是对象的某个属性
function handler<T extends object, K extends keyof T>(obj:T,prop:K) {}


// handler(cat,'s')  // error
handler(cat,'name')  // ok
