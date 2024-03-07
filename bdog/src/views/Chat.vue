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
                <el-main>
                    <ChatC />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import SideBar from '../components/SideBar.vue'
import ChatC from '@/components/ChatC.vue';
</script>

<style scoped></style>