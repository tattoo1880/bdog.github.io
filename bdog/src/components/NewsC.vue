<template>
    <el-row>
        <el-col v-for="(news, index) in newsData" :key="index" :span="5" :offset="2">
            <el-card :body-style="{ padding: '0px' }" class="card">
                <img :src="news.photo" class="image" />
                <div style="padding: 14px">
                    <p class="title">{{ news.title }}</p>
                    <div class="bottom">
                        <p class="sum" :sapn="4">{{ news.summary }}</p>
                        <el-button @click="viewnews(news.url)" type="success" class="button" :sapn="1">详情</el-button>
                    </div>
                </div>
                <!-- <a :href="news.url"  class="el-button" type="success" style="margin-bottom: 1px;">详情</a> -->
            </el-card>
        </el-col>
    </el-row>
    <el-dialog :visible.sync="showNew" width="30%" :before-close="handleClose">
        <span>{{ articleNew }}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showNew = false">取 消</el-button>
        </span>
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
const articleNew = ref()
const showNew = ref(false)
const viewnews = async (url) => {
    // window.open(url)
    try {
        showNew.value = true
        const response = await axios.get(url);
        // console.log(response.data);
        const html = response.data
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        // 找到所有的div class = "article-paragraph"
        const article = doc.querySelectorAll(".article-paragraph")
        let text = "\t"
        for (let i = 0; i < article.length; i++) {
            const element = article[i];
            // 换行拼接
            text += element.innerText + "\n\t"
        }
        articleNew.value = text
        console.log(text);
    } catch (error) {
        console.log(error);
    }
}
const handleClose = (done) => {
    showNew.value = false
    done()
}

</script>
  
<style>
.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
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
}
.title{
    height: 30px;
}
.sum {
    height: 200px;
    line-height: 1.5;
}
</style>
  