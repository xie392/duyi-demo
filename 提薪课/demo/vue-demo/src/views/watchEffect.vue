<!--
 * @Author: xie392
 * @Date: 2023-09-15 18:21:44
 * @Description:  watchEffect 中的异步问题
 * @See: https://v.douyin.com/iembBnQB/
-->
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ref, watchEffect } from 'vue'

const speed = ref<number>(0)
const videoRef = ref<HTMLVideoElement | null>()

watchEffect(() => {
    if (videoRef.value) {
        videoRef.value.playbackRate = speed.value
    }
})

</script>

<template>
   <div class="container">
      <video src="@/assets/ikun.mp4" controls ref="videoRef" width="400" ></video>
      <div class="btns">
          <el-button type="primary" :disabled="speed === 0.5" @click="speed -= 0.5">-0.5</el-button>
          <span>{{ speed.toFixed(1) }}</span>
          <el-button type="primary" :disabled="speed === 3" @click="speed += 0.5">+0.5</el-button>
      </div>
   </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.btns {
    display: flex;
    gap: 20px;
    align-items: center;
}
</style>