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