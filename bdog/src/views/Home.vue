<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header /></el-header>
      <el-container>
        <el-aside width="200px"><SideBar/></el-aside>
        <el-main><Main /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import SideBar from '../components/SideBar.vue'
import Main from '../components/Main.vue'
</script>

<style scoped>

</style>
