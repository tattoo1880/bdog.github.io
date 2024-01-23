<template>
  <!--  使用element-plus 建立一个个人博客主页的头部-->
  <el-header>
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple fonnnn" style=" margin-left: 650px">
          <h1>Tattoo B-Dog</h1>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import {service2} from '@/utils/request'

const getWeather = async () => {
  try {
    const response = await service2.get('/weather')
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getWeather()
})
</script>
<style>
.fonnnn {
  /*更改字体为中空的斜体*/
  font-style: italic;
  font-weight: 900;
  font-family: "Times New Roman", Times, serif;
}
</style>
