<!--
 * @Author: xie392
 * @Date: 2023-09-18 12:02:40
 * @Description: 数据的流式获取, 主要在后端，需要一段一段的返回
 * @See: https://v.douyin.com/iexwVnv8/
-->
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
