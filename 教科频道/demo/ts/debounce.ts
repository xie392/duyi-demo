/*
 * @Author: xie392
 * @Date: 2023-09-18 22:48:36
 * @Description: 对防抖函数进行类型标注
 * @See: https://v.douyin.com/ieQtm3cC/
 */
declare function debounce<T extends any[], K>(fn: (...args: T) => K, delay?: number): (...args: T) => K

function handle(a:number,b:number) {}

const fn = debounce(handle)

// fn(1) // Error: 应有 2 个参数，但获得 1 个。