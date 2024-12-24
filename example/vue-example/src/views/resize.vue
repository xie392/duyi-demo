<!--
 * @Author: xie392
 * @Date: 2023-09-15 00:58:29
 * @Description: 自定义指令 reszie
 * @See: https://v.douyin.com/ieaC4RoA/
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
    <h2>自定义指令 reszie</h2>
    <div >width：{{ sizes.width }} Height：{{ sizes.height }} {{$route.meta}}</div>
    <textarea v-resize="handleSizeChange"></textarea>
  </div>
</template>

