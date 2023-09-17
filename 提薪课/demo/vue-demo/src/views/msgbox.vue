<!--
 * @Author: xie392
 * @Date: 2023-09-16 19:31:24
 * @Description: 如何封装命令式组件 
 * @See: https://v.douyin.com/ie96oemu/
-->
<script setup lang="ts">
import { ElButton } from 'element-plus'
import showMsg from '@/composables/showMsg'

const open = () => {
    showMsg('你好', () => {

    })
}
</script>

<template>
    <el-button type="primary" @click="open">打开弹窗</el-button>
</template>

<style scoped></style>