/**
 * never类型妙用
 * @see:https://v.douyin.com/ieaCHTCg/
 */
function log1<T>(x:T extends number ? never : T) {}
// log1(1) // error
// log1('1') // ok


type BandType<T,K> = T extends K ? never : T
function log2<T>(x:BandType<T,string>) {}
// log2(1) // ok
// log2('1') // error



