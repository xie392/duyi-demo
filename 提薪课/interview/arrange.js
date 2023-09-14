/**
 * 链式调用和延迟执行
 * 
 * @param {string} name 
 */
function arrange(name) {
    // 任务队列
    const tasks = []

    // 添加任务
    tasks.push(() => {
        console.log(`${name} is notified`)
    })

    function doSomething(action) {
        tasks.push(() => {
            console.log(`Start to ${action}`)
        })
        return this
    }

    function wait(sec) {
        tasks.push(() => new Promise(resolve => {
            setTimeout(resolve, sec * 1000)
        }))
        return this
    }

    function waitFirst(sec) {
       // 在任务队列的最前面插入一个任务
       tasks.unshift(() => new Promise(resolve => {
            setTimeout(resolve, sec * 1000)
        }))
        return this
    }

    async function execute() {
        for (const t of tasks) {
            await t()
        }
    }
    
    return {
        do: doSomething,
        wait: wait,
        waitFirst: waitFirst,
        execute: execute
    }
}   


arrange('William').execute()  
// > William is notified


arrange('William').do('commit').execute()
// > William is notified
// > Start to commit


arrange('William').wait(5).do('commit').execute()
// > William is notified
// 等待5秒
// > Start to commit

arrange('William').waitFirst(5).do('commit').execute()
// 等待5秒
// > William is notified
// > Start to commit