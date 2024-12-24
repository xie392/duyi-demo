---
    title: Vue 案例
    updated: 2024-12-23
    author: xie392
    url: https://github.com/xie392/duyi-demo/tree/main/example/vue-example
---


## <a href="https://v.douyin.com/iemNsnrE/" target="_blank">右键菜单组件的封装</a>

`contextmenu.vue`

```ts
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useBeforeEnter, useEnter, useAfterEnter } from '@/hooks/useEnter'

interface MenuOptions {
    label: string
    [key: string]: any
}

interface PropsOptions {
    menu: MenuOptions[]
}

defineProps<PropsOptions>()

const containerRef = ref<HTMLElement | null>(null)
const contextRef = ref<HTMLElement | null>(null)

const emit = defineEmits(['select'])
let x = ref(0)
let y = ref(0)
let show = ref(false)

const open = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    show.value = true
    x.value = e.clientX
    y.value = e.clientY
    if (contextRef.value) {
        useEnter(contextRef.value)
        useAfterEnter(contextRef.value)
    }
}

const close = (e: MouseEvent) => {
    // 这里是阻止默认行为，不阻止的话鼠标右键快速点击会触发浏览器默认行为
    e.preventDefault()
    e.stopPropagation()
    show.value = false
    if (contextRef.value) {
        useBeforeEnter(contextRef.value)
        useAfterEnter(contextRef.value)
    }
}

onMounted(() => {
    containerRef.value && containerRef.value.addEventListener('contextmenu', open)
    window.addEventListener('click', close, true)
    window.addEventListener('contextmenu', close)
    contextRef.value && useBeforeEnter(contextRef.value)
})

onUnmounted(() => {
    containerRef.value && containerRef.value.removeEventListener('contextmenu', open)
})

const handleClick = (item: MenuOptions) => {
    show.value = false
    emit('select', item)
}
</script>

<template>
    <div class="container" ref="containerRef">
        <slot name="default"></slot>
        <Teleport to="body">
            <Transition>
                <div class="context-menu" :style="{ left: `${x}px`, top: `${y}px` }" ref="contextRef">
                    <div class="context-menu-list">
                        <div class="context-menu-list-item" v-for="v, i in menu" :key="i" @click="handleClick(v)">{{ v.label
                        }}</div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.context-menu {
    position: fixed;
    z-index: 99;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: auto;
    overflow: hidden;
}

.context-menu-list {
    padding: 0.2rem 0;
    box-sizing: border-box;
}

.context-menu-list-item {
    padding: 0.35rem 1rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.3s;
    font-size: 0.78rem;
}

.context-menu-list-item:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
}

.context-menu-list-item:hover {
    background: #d5d5d5;
}
</style>
```

`hooks/useEnter.ts`

```ts
export const useBeforeEnter = (el: HTMLElement) => {
    el.style.height = '0px'
}

export const useEnter = (el: HTMLElement) => {
    el.style.height = 'auto'
    const h = el.clientHeight
    el.style.height = '0'
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.height = h + 'px'
            el.style.transition = '.5s'
        })
    })
}

export const useAfterEnter = (el: HTMLElement) => {
    el.style.transition = 'none'
}
```

##  <a href="https://v.douyin.com/ie9MEUYM/" target="_blank">AJAX进度监控</a>

使用 `xhr`

```ts
async function xhrRequest(options: { url: string, method?: 'GET' | 'POST', data?: any }) {
   return new Promise((resolve, reject) => {
        const { url, method = 'GET', data = null } = options
        const xhr = new XMLHttpRequest()

        xhr.addEventListener('progress',onProgress)
        xhr.upload.addEventListener('progress',onProgress)

        xhr.open(method, url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.responseType = 'json'

        xhr.send(data)

        xhr.addEventListener('load', () => {
            resolve(xhr.response)
        })

        xhr.addEventListener('error', () => {
            reject(xhr.response)
        })
   })
}

/**
 * 可以在这里实现 loading 效果
 * @param event 
 */
function onProgress(event:ProgressEvent<XMLHttpRequestEventTarget>) {
    console.log("onProgress",event)
    if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log('下载进度：' + percentComplete + '%');
    } else {
        console.log('无法计算总大小的进度更新');
    }
}

export default xhrRequest
```

例子:

```ts
import xhrRequest from '@/utils/xhr'

const xhrGet = async () => {
    const res = await xhrRequest({ url:'/api/request', method: 'GET' })
    console.log(res)
}
```

使用 `fetch`

```ts
function fetchRequest(options: { url: string, method: 'GET' | 'POST', data?: any }) {
    const { url, method = 'GET', data = {} } = options

    return new Promise( async (resolve) => {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            // body: JSON.stringify(data )
        })
        // 获取响应体的长度
        const total = Number(resp.headers.get('Content-Length'))
        // 获取响应体的编码
        const decoder = new TextDecoder()
        let body = ''
        const reader = (resp.body as any).getReader()
        let loaded = 0
        while(1) {
            const { done, value } = await reader.read()
            if (done) {
                break
            }
            loaded += value?.length ?? 0
            body += decoder.decode(value)
            onProgress({ loaded, total })
        }
        // resolve(resp)
    })
}

function onProgress({ loaded, total }: { loaded: number, total: number }) {
    console.log('下载进度：' + loaded / total * 100 + '%')
}

export default fetchRequest
```

例子：

```ts
import fetchRequest from '@/utils/fetch'

const fetchGet = async () => {
    const res = await fetchRequest({ url:'/request', method: 'GET' })
    console.log(res)
}
```

## <a href="https://v.douyin.com/ieQj8nN5/" target="_blank">请求取消</a>

```ts
<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import { ref } from 'vue'

interface ListItem {
  value: string
  label: string
}

const options = ref<ListItem[]>([])
const value = ref<string[]>([])
const loading = ref(false)


let controller: AbortController
const remoteMethod = async (query: string) => {
  if (query === '') {
    options.value = []
    return
  }
  // 如果有正在请求的请求， 就取消请求
  controller && controller.abort()

  // 如果需要终止请求， 只需要调用 controller.abort() 即可
  controller = new AbortController()

  const res = await fetch(`/api/search?q=${query}`, { signal: controller.signal }).then(res => res.json())
  options.value = res.data.map((v: string) => ({ value: v, label: v }))
}
</script>

<template>
  <h2>请求取消</h2>
  <el-select v-model="value" filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading"
    style="width:500px;" placeholder="请输入关键词">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
```

## <a href="https://v.douyin.com/ieHy9SeU/" target="_blank">利用自定义 ref 实现防抖</a>

```ts
<script setup lang="ts">
import { customRef } from 'vue'

const debounceRef = (value: any, duration: number = 1000) => {
    let timer: string | number | NodeJS.Timeout | undefined;
    return customRef((track, trigger) => {
        return {
            get() {
                // 收集依赖
                track()
                return value
            },
            set(val) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    // 触发依赖
                    trigger()
                    value = val
                }, duration)

            }
        }
    })
}
const text = debounceRef('',500)
</script>

<template>
    <div>
        <h2>自定义 ref 实现防抖</h2>
        <input v-model="text"/>
        <p>{{ text }}</p>
    </div>
</template>
```


## <a href="https://v.douyin.com/iexk8SKV/" target="_blank">使用defer优化白屏时间 </a>

```ts
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
    onMounted(() => {
        cancelAnimationFrame(refId)
    })

    // return function defer(n:number) {
    //     return frameCount.value >= n
    // }

    return {
        defer: (n:number) =>frameCount.value >= n,
        cancelDefer: () => cancelAnimationFrame(refId)
    }
}
```

使用

```ts
<script setup lang="ts">
import Defer from '@/components/defer.vue'

const {defer} = useDefer(1000)
</script>

<template>
    <div>
        <h1>使用defer优化白屏时间 </h1> 
        <div v-for="i in 1000" :key="i" class="list-all">
            <div style="width: 40px;"> {{ i < 10 ? '0' + i : i }}</div>
            <Defer v-if="defer(i)" class="list"/>
        </div>
    </div>
</template>

<style scoped>

.list-all {
    display: flex;
    column-gap: 5px;
}
.list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
}
</style>
```

## <a href="https://v.douyin.com/ie96oemu/" target="_blank">如何封装命令式组件</a>

```ts
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
```

`MessageBox.vue`

```ts
<script setup lang="ts">
interface PropsOptions {
    msg: string
    handleClick: () => void
}

 defineProps<PropsOptions>()

</script>

<template>
   <div class="message-box">
        <div class="message-content">
            <div class="message">{{ msg }}></div>
            <button @click="handleClick">确定</button>
        </div>
   </div>
</template>
```

使用：

```ts
<script setup lang="ts">
import { ElButton } from 'element-plus'
import showMsg from '@/composables/showMsg'

const open = () => {
    showMsg('你好', () => {

    })
}
</script>

<template>
    <h2>如何封装命令式组件</h2>
    <el-button type="primary" @click="open">打开弹窗</el-button>
</template>
```

## <a href="https://v.douyin.com/ieaC4RoA/" target="_blank">自定义指令 reszie</a>

```ts
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
```

需要在 `main.ts` 中注册指令：

```ts
const app = createApp(App)

app.directive('resize', resize)
app.mount('#app')
```

使用：

```ts
<script setup lang="ts">
import { reactive } from 'vue'

const sizes = reactive<{width:number,height:number}>({width:0,height:0})

const handleSizeChange = (size:{width:number,height:number}) => {
  console.log('handleSizeChange',size)
  sizes.width = size.width
  sizes.height = size.height
}
</script>

<template>
  <div ref="testRef">
    <h2>自定义指令 reszie</h2>
    <div >width：{{ sizes.width }} Height：{{ sizes.height }} {{$route.meta}}</div>
    <textarea v-resize="handleSizeChange"></textarea>
  </div>
</template>
```

## <a href="https://v.douyin.com/iexwVnv8/" target="_blank">数据的流式获取</a>

后端：

```ts
import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

const content = faker.lorem.paragraph({ min: 3, max: 5 })

export default [
  {
    url: '/api/stream',
    method: 'post',
    // response: () => {
    //   return response(200, 'success', {content})
    // },
    rawResponse: async (req, res) => {
      // 设置响应头，指定内容类型为流
      res.setHeader('Content-Type', 'application/octet-stream');
      // 创建一个可写流，并将其绑定到响应对象
      const stream = res;

      // 将内容分成小块，每个小块一个字符，并逐个发送
      for (const char of content) {
        stream.write(char);
        await new Promise(resolve => setTimeout(resolve, 100)); // 添加延迟以模拟逐字逐字发送
      }
      res.end()
    }
  },
] as MockMethod[]
```

使用:
```ts
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ref } from 'vue'

const content = ref<string>('')

const getStream = async () => {
    content.value = ''
    const resp = await fetch('/api/stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: 'hello world'
        })
    })
    if (!resp.body) return
    const reader = resp.body.getReader()

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        content.value += new TextDecoder().decode(value)
    }
}

</script>

<template>
    <div>
        <h2>数据的流式获取</h2>
        <el-button @click="getStream" type="primary">获取数据</el-button>
        <p>{{ content }}</p>
    </div>
</template>

<style scoped></style>
```

## <a href="https://v.douyin.com/iembBnQB/" target="_blank">watchEffect 中的异步问题</a>

```ts
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ref, watchEffect } from 'vue'

const speed = ref<number>(0)
const videoRef = ref<HTMLVideoElement | null>()

watchEffect(() => {
    if (videoRef.value) {
        videoRef.value.playbackRate = speed.value
    }
})

</script>

<template>
    <h2>watchEffect 中的异步问题</h2>
   <div class="container">
      <video src="@/assets/ikun.mp4" controls ref="videoRef" width="400" ></video>
      <div class="btns">
          <el-button type="primary" :disabled="speed === 0.5" @click="speed -= 0.5">-0.5</el-button>
          <span>{{ speed.toFixed(1) }}</span>
          <el-button type="primary" :disabled="speed === 3" @click="speed += 0.5">+0.5</el-button>
      </div>
   </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.btns {
    display: flex;
    gap: 20px;
    align-items: center;
}
</style>
```

## <a href="https://v.douyin.com/ieu35LPD/" target="_blank">约定式路由</a>

```ts
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
    ...routesList
]

console.log("routes", routes)


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
```


