<template>
  <!--  使用element-plus 建立一个个人博客主页的头部-->
  <el-header>
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple fonnnn" style=" margin-left: 650px">
          <h1 class="title">Tattoo B-Dog</h1>
        </div>
      </el-col>
      <!-- 做一个天气预报的卡片 -->
      <el-col :span="8">
          <el-alert :title="weatherTitle" type="success" show-icon />
      </el-col>
    </el-row>
  </el-header>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { service2 } from '@/utils/request'

const weather = ref([])
const weatherTitle = ref()
const getWeather = async () => {
  try {
    const response = await service2.get('/weather')
    // console.log(response.data)
    weather.value = response.data.data.now
    // console.log(weather.value)
    weatherTitle.value = "气温：" + weather.value.temperature + "℃" + " | " + "降水量：" + weather.value.precipitation +  "mm" +" | " + "风向：" + weather.value.windDirection + " | " + "风力：" + weather.value.windScale
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

.box-card {
  width: 100px;
  height: 300px;
  /* margin-right: 0px; */
  float: right;
  margin-top: 1px;
  font-size: 10px;
}

.title {
    color: #0f0;
    font-weight: bold;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0;
    animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #0f0;
    }

    to {
        text-shadow: 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0, 0 0 50px #0f0, 0 0 60px #0f0;
    }
}
</style>
