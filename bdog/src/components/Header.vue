<template>
  <!--  使用element-plus 建立一个个人博客主页的头部-->
  <el-header>
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple fonnnn" style=" margin-left: 650px">
          <h1>Tattoo B-Dog</h1>
        </div>
      </el-col>
      <!-- 做一个天气预报的卡片 -->
      <el-col :span="8">
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>天气预报</span>
          </div>
          <div>
            <p>城市：天津</p>
            <p>温度：{{weather.temperature}}℃</p>
            <p>风向：{{weather.windDirection}}</p>
            <p>风力：{{weather.windScale}}级</p>
            <p>湿度：{{weather.humidity}}%</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-header>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import {service2} from '@/utils/request'

const weather = ref([])

const getWeather = async () => {
  try {
    const response = await service2.get('/weather')
    // console.log(response.data)
    weather.value = response.data.data.now
    console.log(weather.value)
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

.box-card{
  width: 100px;
  height: 300px;
  /* margin-right: 0px; */
  float: right;
  margin-top: 1px;
  font-size: 10px;
}
</style>
