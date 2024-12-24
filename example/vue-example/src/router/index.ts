/*
 * @Author: xie392
 * @Date: 2023-09-16 11:52:40
 * @Description: 约定式路由
 * @See: https://v.douyin.com/ieu35LPD/
 */
import { createRouter, createWebHistory } from 'vue-router'

// 拿到所有的路由,只包含到二级目录下的 vue 文件
const pages = import.meta.glob('../views/**/*.vue',/* { eager: true, import: 'default' } */)


const routesList = Object.entries(pages).map(([path]) => {
    const pagePath = path.replace('../views/', '').replace('.vue', '') ?? '/'
    const name = pagePath.split('/').filter(Boolean).join('-') ?? 'index'
    return {
        path: '/' + name,
        name,
        component: pages[path],
        meta: {}
    }
})

const routes = [
    // {
    //     path: '/',
    //     name: 'resize',
    //     component: () => import('../views/resize.vue'),
    //     mtea: {
    //         title: 'Resize 封装'
    //     }
    // },
    // {
    //     path: '/contextmenu',
    //     name: 'contextmenu',
    //     component: () => import('../views/contextmenu.vue'),
    //     meta: {
    //         title: '右键菜单组件的封装'
    //     }
    // },
    // {
    //     path: '/watchEffect',
    //     name: 'watchEffect',
    //     component: () => import('../views/watchEffect.vue'),
    //     meta: {
    //         title: 'WatchEffect 中的异步问题'
    //     }
    // },
    ...routesList
]

console.log("routes", routes)


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router