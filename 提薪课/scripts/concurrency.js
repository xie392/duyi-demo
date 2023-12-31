/*
 * @Author: xie392
 * @Date: 2023-09-15 20:14:48
 * @Description: 并发任务控制
 * @See: https://v.douyin.com/iemvkACm/
 */
function timeout(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

class SuperTask {
    constructor(parallelCount = 2) {
        // 并发数量
        this.parallelCount = parallelCount
        // 任务列表
        this.task = []
        // 正在执行的任务
        this.runningCount = 0
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.task.push({
                task,
                resolve,
                reject
            })
            this._run()
        })
    }

    _run() {
        // 如果还有任务
        if (this.runningCount < this.parallelCount && this.task.length > 0) {
            // 从任务列表中取出一个任务，取出后去除该任务
            const { task, resolve, reject } = this.task.shift()
            // 正在执行任务总数 + 1
            this.runningCount++
            // 执行任务
            task().then(resolve, reject).finally(() => {
                // 执行完毕，正在执行任务总数 - 1
                this.runningCount--
                // 开始下一个任务
                this._run()
            })
        }
    }
}


const superTask = new SuperTask()

function addTask(time, name) {
    superTask
        .add(()=>timeout(time))
        .then(() => {
            console.log(`任务 ${name} 完成`)
        })
}


addTask(10000, '任务1')      // 3
addTask(5000, '任务2')       // 1
addTask(3000, '任务3')       // 2
addTask(2000, '任务4')       // 4
addTask(1000, '任务5')       // 5

