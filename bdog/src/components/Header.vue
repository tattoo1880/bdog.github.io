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
import {ref,onMounted} from 'vue'
import axios from 'axios'
const getweather = async() =>{
  try {
    const response = await axios.get('https://weather.cma.cn/api/now/54517')
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
</script>
<style>
.fonnnn{
    /*更改字体为中空的斜体*/
    font-style: italic;
    font-weight: 900;
    font-family: "Times New Roman", Times, serif;
  }

</style>
