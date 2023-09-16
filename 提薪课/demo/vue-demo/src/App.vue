<!--
 * @Author: xie392
 * @Date: 2023-09-15 00:56:55
 * @Description: 
-->
<script setup lang="ts">
</script>

<template>
  <div class="main">
    <div class="sidebar">
      <ul class="nav">
        <router-link v-for="v, i in $router.options.routes" :key="i" class="nav-item" :to="v.path">
          {{ v.name }}
        </router-link>
      </ul>
    </div>
    <div class="content">
      <RouterView />
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
      display: block;
      text-decoration: none;
      color: #333;

      &:hover {
        background: orange;
        color: #fff;
      }
    }

    .router-link-active {
      background: orange;
      color: #fff;
    }
  }
}

.content {
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
