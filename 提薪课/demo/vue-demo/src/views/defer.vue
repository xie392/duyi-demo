<!--
 * @Author: xie392
 * @Date: 2023-09-17 21:16:04
 * @Description: 使用defer优化白屏时间 
 * @See: https://v.douyin.com/iexk8SKV/ 
-->
<script setup lang="ts">
import { useDefer } from '@/hooks/useDefer'
import Defer from '@/components/defer.vue'

const defer = useDefer(1000)
</script>

<template>
    <div>
        <h1>Defer</h1> 
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