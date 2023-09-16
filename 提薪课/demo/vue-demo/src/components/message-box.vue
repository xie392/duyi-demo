<script setup lang="ts">


interface PropsOptions {
    msg: string
    handleClick: () => void
}

 defineProps<PropsOptions>()

</script>

<template>
   <div class="message-box">
        <div class="message-content">
            <div class="message">{{ msg }}></div>
            <button @click="handleClick">确定</button>
        </div>
   </div>
</template>

<style scoped lang="scss">
.message-box {
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;

    .message-content {
        width: 300px;
        height: 200px;
        background: #fff;
        border-radius: 10px;
    }
}
</style>