/*
 * @Author: xie392
 * @Date: 2023-09-16 19:31:24
 * @Description: 如何封装命令式组件 
 * @See: https://v.douyin.com/ie96oemu/
 */
import { Component, createApp } from "vue"
import MessageBox from "@/components/message-box.vue"

// const MessageBox:Component = {
//     props: {
//         msg: { type: String, required: true },
//     },
//     emit: ['handleClick'],
//     setup(props, { emit }) {
//         console.log("setup", props, emit);
//     },
//     render() {
//         return h('div', {}, this.msg)
//     }
// }

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