<!--
 * @Author: xie392
 * @Date: 2023-09-17 10:40:32
 * @Description: AJAX进度监控 
 * @See: https://v.douyin.com/ie9MEUYM/
-->
<script setup lang="ts">
import { ElButton } from 'element-plus'
import xhrRequest from '@/utils/xhr'
import fetchRequest from '@/utils/fetch'


const xhrGet = async () => {
    const res = await xhrRequest({ url:'/api/request', method: 'GET' })
    console.log(res)
}


const fetchGet = async () => {
    const res = await fetchRequest({ url:'/request', method: 'GET' })
    console.log(res)
}

</script>

<template>
    <div>
        <h2>AJAX进度监控</h2>
        <el-button type="primary" @click="xhrGet">xhr 获取数据</el-button>
        <!-- <el-button type="primary" @click="axiosGet">axios 获取数据</el-button> -->
        <el-button type="primary" @click="fetchGet">fetch 获取数据</el-button>
    </div>
</template>

<style scoped></style>