/*
 * @Author: xie392
 * @Date: 2023-09-18 22:23:02
 * @Description: 前置的不定量参数
 * @See: https://v.douyin.com/ieQG2HdD/
 */
type JSTypeMap = {
    string: string
    number: number
    boolean: boolean
    object: object
    function: Function
    symbol: symbol
    undefined: undefined
    bigint: bigint
  }

type JSTYPENAME = keyof JSTypeMap

type ArgsType<T extends JSTYPENAME[]> = {
    [K in keyof T] : JSTypeMap[T[K]]
}


declare function addImpl<T extends JSTYPENAME[]>(...args:[...T,(...args:ArgsType<T>)=>any]):void

// addImpl('hello','world',()=>{})  // error:  不能将类型“"hello"”分配给类型“keyof JSTypeMap”。
// addImpl(1,2,3,()=>{})       // error:   不能将类型“1”分配给类型“keyof JSTypeMap”
addImpl('number',(a)=>{})  // true
