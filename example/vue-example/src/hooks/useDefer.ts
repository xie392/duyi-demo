/*
 * @Author: xie392
 * @Date: 2023-09-17 21:16:04
 * @Description: 使用defer优化白屏时间 
 * @See: https://v.douyin.com/iexk8SKV/ 
*/
import { ref } from "vue"

export function useDefer(max:number = 100) {
    const frameCount = ref<number>(0)
    let refId:number
    function updateFrameCount() {
        refId =  requestAnimationFrame(() => {
            frameCount.value++
            if(frameCount.value >= max) {
                return
            }
            updateFrameCount()
        })
    }
    updateFrameCount()

    // 如果取消渲染，那么页面就是空白页
    // onMounted(() => {
    //     cancelAnimationFrame(refId)
    // })

    return function defer(n:number) {
        return frameCount.value >= n
    }
}