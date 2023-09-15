<!--
 * @Author: xie392
 * @Date: 2023-09-15 12:03:52
 * @Description: 右键菜单组件的封装 和视频有写差异
 * @See: https://v.douyin.com/iemNsnrE/
-->
<script setup lang="ts">
import ContextMenu from '@/components/contextmenu.vue'

const menu = [
    { label: '按钮一' },
    { label: '按钮二' },
    { label: '按钮三' },
    { label: '按钮四' }
]

const select = () => { }

</script>

<template>
    <div>
        <ContextMenu :menu="menu" @select="select">
            <div class="context"></div>
        </ContextMenu>
    </div>
</template>

<style scoped>
.context {
    width: 300px;
    height: 200px;
    background: orange;
}
</style>