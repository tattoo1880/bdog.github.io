<template>

    <div>
        <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <SideBar />
                </el-aside>
                <el-main style="margin-left: 50px; margin-top: 70px;">
                    <Editor v-model="value" editorStyle="height: 500px" />
                </el-main>
            </el-container>
        </el-container>
    </div>
    </div>

</template>

<script setup lang='ts'>
import Header from '../components/Header.vue'
import SideBar from '../components/SideBar.vue'
import {ref,reactive} from 'vue'
import Editor from 'primevue/editor';
const value = ref('');

</script>

<style lang='less' scoped>

</style>