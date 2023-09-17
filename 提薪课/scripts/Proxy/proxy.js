/*
 * @Author: xie392
 * @Date: 2023-09-17 18:22:56
 * @Description: 使用代理实现单例
 * @See: https://v.douyin.com/ie9K97AL/
 */
class MyVideo {

    constructor(a,b){
        this.a = a
        this.b = b
    }
    
    sayHello(){
        console.log('hello')
    }
}

function isSame(value1,value2){
    if(value1.length !== value2.length){
        return false
    }

    for (let i = 0; i < value1.length; i++) {
        if(value1[i] !== value2[i]){
            return false
        }
    }
    
    return true
}

function singaleton(className) {
    let ins, parameters
    return new Proxy(className,{
        construct(target,args){
            if(!ins){
                ins = new target(target,...args)
                parameters = args
            }
            if(!isSame(parameters,args)){
                throw new Error('参数不一致')
            }
            return ins
        }
    })
}

module.exports = singaleton(MyVideo)

