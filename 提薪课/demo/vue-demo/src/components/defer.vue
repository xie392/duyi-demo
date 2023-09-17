<!--
 * @Author: xie392
 * @Date: 2023-09-17 21:16:04
 * @Description: 使用defer优化白屏时间 
 * @See: https://v.douyin.com/iexk8SKV/ 
-->
<script setup lang="ts"></script>

<template>
    <div>
        <div v-for="i in 40" :key="i"  class="item"></div>
    </div>
</template>

<style scoped>
.item {
    width: 10px;
    height: 10px;
    border: 1px solid #333;
}
</style>