<!--
 * @Author: xie392
 * @Date: 2023-09-18 12:02:40
 * @Description: 请求取消
 * @See: https://v.douyin.com/ieQj8nN5/
-->
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

<style scoped></style>
