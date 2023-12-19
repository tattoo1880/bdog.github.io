<template>
<!--  创建一个main组件负责 展示内容，使用element美化 -->
  <div class="main">
    <el-container>
      <el-main>
        <div class="content">
        <Content />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Content from '../components/Content.vue'
</script>
