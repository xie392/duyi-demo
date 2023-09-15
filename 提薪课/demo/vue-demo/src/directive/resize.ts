/*
 * @Author: xie392 
 * @Date: 2023-09-15 09:57:25
 * @Description: 封装 resize
 * @see: https://v.douyin.com/ieaC4RoA/
 */
import { Directive } from 'vue'

const map = new WeakMap<HTMLElement, (size: { width: number, height: number }) => void>()

const ob = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const handler = map.get(entry.target as HTMLElement)

        if (handler) {
            handler({
                width: entry.borderBoxSize[0].inlineSize,
                height: entry.borderBoxSize[0].blockSize
            })
        }

    }
})

export const resize: Directive = {
    mounted(el:HTMLElement, binding:any) {
        map.set(el, binding.value)
        ob.observe(el)
        
    },
    unmounted(el: HTMLElement) {
        map.delete(el)
        ob.unobserve(el)
    }
}

export default resize

