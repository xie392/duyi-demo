
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