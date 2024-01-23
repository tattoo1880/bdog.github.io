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
import axios from 'axios'
const getweather = async () => {
  try {

    const response = await axios.get('https://weather.cma.cn/web/weather/54517.html', {
      headers: {
        'Referer': 'https://weather.cma.cn/web/weather/54517.html',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  await getweather()
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
