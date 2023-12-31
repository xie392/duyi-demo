/**
 * 漩涡型二维数组
 * 
 * @see:https://v.douyin.com/ieaCawgS/
 * @param {number} col  列
 * @param {number} row  行
 * @returns {Array}     二维数组
 * @example
 * 1  2  3  4  
 * 10 11 12 5
 * 9  8  7  6
 */
function vortexMatrix(col, row) {
    // 创建二维数组 初始值为0
    const matrix = Array.from({ length: row }, () => Array.from({ length: col }, () => 0))

    // 定义上下左右边界
    let top = 0
    let bottom = row - 1
    let left = 0
    let right = col - 1

    // 定义当前位置
    let current = 1

    // 循环填充
    while (current <= col * row) {
        // 从左到右
        for (let i = left; i <= right; i++) {
            matrix[top][i] = current++
        }
        top++

        // 从上到下
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = current++
        }
        right--

        // 从右到左
        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = current++
        }
        bottom--

        // 从下到上
        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = current++
        }
        left++
    }

    // 打印
    matrix.forEach(row => {
        console.log(row.join(' '))
    })

    return matrix
}

vortexMatrix(4, 3)