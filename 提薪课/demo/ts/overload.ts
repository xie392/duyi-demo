/*
 * @Author: xie392
 * @Date: 2023-09-17 10:26:31
 * @Description: TS 中的重载
 * @See: https://v.douyin.com/ie9MhaTH/
 */
function message(option: object): void
function message(text: string, onclose?: Function): void
function message(text:string,...args:any[]): void

function message(params: string | object,...args:any[]): void {
    console.log(params,args)
}

message({ text: 'hello' })
message('hello')
message('hello',function(){})
