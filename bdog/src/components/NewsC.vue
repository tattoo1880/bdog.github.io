<template>
    <el-row>
        <el-col v-for="(news, index) in newsData" :key="index" :span="5" :offset="2">
            <el-card :body-style="{ padding: '0px' }" class="card">
                <img :src="news.photo" class="image" />
                <div style="padding: 14px">
                    <p class="title">{{ news.title }}</p>
                    <div class="bottom">
                        <p class="sum" :sapn="3">&emsp;&emsp;&emsp;{{ news.summary }}</p>
                        <el-button @click="viewnews(news.url,news.title)" type="success" class="button" :sapn="2" plain>详情</el-button>
                    </div>
                </div>
                <!-- <a :href="news.url"  class="el-button" type="success" style="margin-bottom: 1px;">详情</a> -->
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="showNew" :title="articleT" width="80%" center>
        <span>
            <div v-html="articleNew" ></div>
        </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showNew = false" type="success" plain>Cancel</el-button>
            </span>
        </template>
    </el-dialog>
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
            // 'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            // 'sec-ch-ua-mobile': '?0',
            // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Cache-Control': 'max-age=600',
            // 'Referer': 'https://cn.nytimes.com/',
            'X-Requested-With': 'XMLHttpRequest',
            // 'sec-ch-ua-platform': '"macOS"'
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
const articleNew = ref()
const articleT = ref()
const showNew = ref(false)
const viewnews = async (url,title) => {
    // window.open(url)
    try {
        showNew.value = true
        articleT.value = title
        const response = await axios.get(url);
        // console.log(response.data);
        const html = response.data
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        // 找到所有的div class = "article-paragraph"
        const article = doc.querySelectorAll(".article-paragraph")
        let text = '&emsp;&emsp;'
        for (let i = 0; i < article.length; i++) {
            const element = article[i];
            // 换行拼接
            text += '<div>' + '&emsp;&emsp;' + element.innerText + "</div>"
        }
        articleNew.value = text
        console.log(text);
    } catch (error) {
        console.log(error);
    }
}
</script>
  
<style>
.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    /* flex-direction: column; */
    justify-content:space-between;
    align-items: center;
}

.button {
    /* 距离父组件底部2px */
    margin-bottom: 2px;
    /* 距离父组件左边距离2px */
    margin-left: 2px;
}

.image {
    width: 100%;
    height: 250px;
    display: block;
}

.button {
    margin-top: 130px;
    /* display: float; */
    float: right;
}

.card {
    display: flex;
    flex-direction: column;
    width: 320px;
    margin-top: 20px;
    height: 550px;
    border: 1px solid rgb(36, 104, 36);
    border-radius: 5px;
    box-shadow: 0 0 10px #0f0;
}

.title {
    /* 字体加粗 */
    font-weight: bold;
    height: 30px;
    font-family: sans-serif;
    color:#0f0;
    padding-right: 5px;
    /* animation: glow 3s ease-in-out infinite alternate; */
}

.sum {
    height: 200px;
    line-height: 1.5;
    font-family:monospace;
    font-size: 14px;
}
/* @keyframes glow {
from {
        text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #0f0;
    }

    to {
        text-shadow: 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0, 0 0 50px #0f0, 0 0 60px #0f0;
    }
} */
</style>
  