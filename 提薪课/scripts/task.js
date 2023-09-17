/*
 * @Author: xie392
 * @Date: 2023-09-16 11:14:23
 * @Description: 任务队列的中断和恢复
 * @See: https://v.douyin.com/ieuVQ8Hk/
 */

/**
 * 依次顺序执行一系列任务
 * 所有任务全部完成后可以得到每个任务的执行的结果
 * 需要返回两个方法，start 用于启动任务， pause 用于暂停任务
 * 每个任务具有原子性，即不可中断，只能在两个任务之间中断
 * @param {...Function} tasks 任务列表，每个任务无参、异步
 */
function processTasks(...tasks) {
    // 任务队列
    const tasksQueue = []
    // 是否正在运行
    let isRunning = false
    // 当前执行任务索引
    let currentIndex = 0

    async function start() {
        return new Promise((resolve, reject) => {
            // 如果正在运行则直接返回
            if (isRunning) return

            isRunning = true
            // 启动任务
            while (currentIndex < tasks.length) {
                // 执行任务
                tasksQueue.push(tasks[currentIndex++]())
                if (!isRunning) break
            }

            // 等待所有任务执行完毕
            isRunning = false

            resolve(tasksQueue)
        })
    }

    function pause() {
        isRunning = false
    }

    return {
        start,
        pause
    }
}
