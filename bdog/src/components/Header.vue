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
    const response = await axios.get('https://weather.cma.cn/api/now/54517', {
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'Hm_lvt_c758855eca53e5d78186936566552a13=1705982811; _trs_uv=lrpu4a3t_6252_1gq; _trs_ua_s_1=lrpu4a3t_6252_eo8v; Hm_lpvt_c758855eca53e5d78186936566552a13=1705982881',
        'Referer': 'https://weather.cma.cn/web/weather/54517.html',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"'
      }
    })
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
