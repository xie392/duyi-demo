/*
 * @Author: xie392
 * @Date: 2023-09-16 19:31:24
 * @Description: 如何封装命令式组件 
 * @See: https://v.douyin.com/ie96oemu/
 */
import { createApp } from "vue"
import MessageBox from "@/components/message-box.vue"

function showMsg(msg: string, callback: Function) {
    const msgBox = document.createElement('div')
    document.body.appendChild(msgBox)

    // 创建组件
    const app = createApp(MessageBox, {
        msg,
        handleClick() {
            callback && callback()
            app.unmount()
            document.body.removeChild(msgBox)
        }
    })
    // 渲染组件
    app.mount(msgBox)
}

export default showMsg