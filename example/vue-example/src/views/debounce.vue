<!--
 * @Author: xie392
 * @Date: 2023-09-16 19:12:10
 * @Description: 利用自定义 ref 实现防抖
 * @See: https://v.douyin.com/ieHy9SeU/
-->
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

<style scoped></style>