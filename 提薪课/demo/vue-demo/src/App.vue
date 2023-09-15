<script setup lang="ts">
import { ref, markRaw } from 'vue'
import Resize from './views/resize.vue'
import ContextMenu from './views/contextmenu.vue'
import watchEffect from './views/watchEffect.vue'

const index = ref(0)
const menus = ref([
  { name: '封装 resize', component: markRaw(Resize) },
  { name: '右键菜单组件的封装', component: markRaw(ContextMenu) },
  { name: 'watchEffect', component: markRaw(watchEffect) }
])

</script>

<template>
  <div class="main">
    <div class="sidebar">
      <ul class="nav">
        <li v-for="v, i in menus" :key="i" class="nav-item" :class="index === i && 'nav-item-active'" @click="index = i">
          {{ v.name }}</li>
      </ul>
    </div>
    <div class="content">
      <component :is="menus[index].component" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100vh;
  display: flex;
}

.sidebar {
  width: 300px;
  min-height: 100vh;
  border-right: 1px solid #ccc;
  // padding: 1rem 0;
  box-sizing: border-box;

  .nav {
    list-style: none;
    margin: 0;
    padding: 0;

    .nav-item {
      width: 100%;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: orange;
        color: #fff;
      }
    }

    .nav-item-active {
      background: orange;
      color: #fff;
    }
  }
}

.content {
  padding: 1rem;
  box-sizing: border-box;
}
</style>
