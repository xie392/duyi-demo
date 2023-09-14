<!-- 
  @description: 自定义指令 reszie
  @see: https://v.douyin.com/ieaC4RoA/
 -->

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
    <h1>自定义指令</h1>
    <div >width：{{ sizes.width }} Height：{{ sizes.height }}</div>
    <textarea v-resize="handleSizeChange"></textarea>
  </div>
</template>
