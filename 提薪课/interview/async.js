/**
 * 消除异步传染性
 * @see:https://v.douyin.com/ieax1Rwb/
 */
async function getUser() {
    return await fetch('1.json')
}

async function m1() {
    const user = await getUser()
    return user
}

async function m2() {
    const user = await m1()
    return user
}

async function m3() {
    const user = await m2()
    return user
}

async function main() {
    console.log(1)
    const user = await m3()
    console.log(user)
}

function run(func) {
    // 缓存
    const cache = {
        status: 'pending',
        value: null
    }
    const oldFetch = window.fetch

    // 2、保存数据
    window.fetch = function (...args) {
        try {
            // 有缓存就缓存数据
            if (cache.status === 'fulfilled') {
                return cache.value
            } else if (cache.status === 'rejected') {
                throw Promise.reject(cache.value)
            }
            // 1、发送真实请求
            const prom = oldFetch(...args).then(resp => resp.json()).then(res => {
                cache.status = 'fulfilled'
                cache.value = res
            }).catch(err => {
                cache.status = 'rejected'
                cache.value = err
            })
            // 2、抛出错误
            throw prom
        }
        catch (err) {
            if (err instanceof Promise) {
                err.then(func, func).finally(() => {
                    window.fetch = oldFetch
                })
            }
        }
    }
    // 执行入口函数
    func()
}

run(main)
