<!--
 * @Author: xie392
 * @Date: 2023-09-15 12:03:52
 * @Description: 右键菜单组件的封装 和视频有写差异
 * @See: https://v.douyin.com/iemNsnrE/
-->
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