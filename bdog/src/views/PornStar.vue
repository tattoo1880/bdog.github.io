<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <SideBar />
                </el-aside>
                <el-main style="margin-left: 50px;">
                    <PornStarC/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script setup>
import Header from '../components/Header.vue'
import SideBar from '../components/SideBar.vue'
import PornStarC from '../components/PornStarC.vue'
</script>
  
<style scoped>
.el-aside,
.el-main {
  height: calc(100vh - 60px); /* 60px 是 Header 的高度，根据实际情况调整 */
  overflow: auto; /* 添加滚动条，当内容超出容器高度时 */
}
</style>
  