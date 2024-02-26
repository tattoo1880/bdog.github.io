<template>
    <el-row class="oel">
        <el-input v-model="input" placeholder="请输入内容" class="sinput"></el-input>
        <el-button @click="download" type="warning" plain>下载</el-button>
    </el-row>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const input = ref('')
const download = () => {
    console.log(input.value)
}

</script>

<style scoped>
.sinput {
    width: 600px;
}

.oel {
    margin-top: 120px;
    display: flex;
    justify-content: space-evenly;
}
</style>