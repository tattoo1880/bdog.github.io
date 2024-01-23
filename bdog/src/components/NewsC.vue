<template>
    <el-row>
        <el-col v-for="(news,index) in newsData" :key="index" :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
                <img :src="news.photo" class="image" />
                <div style="padding: 14px">
                    <span>{{ news.title }}</span>
                    <div class="bottom">
                        <p>{{ news.summary }}</p>
                        <!-- <time class="time"></time> -->
                        <!-- <el-button text class="button">Operating</el-button> -->
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
const newsData = ref([])
const getNews = async () => {

    const baseUrl = "https://cn.nytimes.com/async/mostviewed/all/"
    const response = await axios.get(baseUrl, {
        params: {
            lang: 'zh-hans',

        },
        headers: {
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Cache-Control': 'max-age=600',
            'Referer': 'https://cn.nytimes.com/',
            'X-Requested-With': 'XMLHttpRequest',
            'sec-ch-ua-platform': '"macOS"'
        }
    });
    // console.log(response.data.list.daily);
    const l = response.data.list.daily
    let news = []
    // map l to news
    for (let i = 0; i < l.length; i++) {
        let item = l[i]
        // 如果type 是article 并且有summary
        if (item.type == "article" && item.summary) {
            try {
                news.push({
                    title: item.headline,
                    summary: item.summary,
                    url: item.url,
                    photo: item.photo.url,
                })
            } catch (error) {
                continue
            }
        }
    }
    // console.log(news);
    return news
}
onMounted(() => {
    getNews().then((res) => {
        newsData.value = res
        console.log(newsData);
    })
})


</script>
  
<style>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    height: 200px;
    display: block;
}
</style>
  