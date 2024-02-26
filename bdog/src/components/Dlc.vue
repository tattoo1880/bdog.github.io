<template>
    <el-row class="oel">
        <el-input v-model="input" placeholder="请输入内容" class="sinput"></el-input>
        <el-button @click="download" type="warning" plain>下载</el-button>
    </el-row>

    <el-row>
        <url>
            <li v-if="newurls != null" v-for="item in newurls" :key="item">{{ item }}</li>
        </url>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { service6 } from '@/utils/request'
import jsonpath from "jsonpath";
import axios from 'axios'
const input = ref('')
const newurls = ref([])
const download = async () => {
    const statusurl = input.value
    const keyValue = statusurl.split('/').pop()

    console.log(statusurl)
    try {
        const res = await service6({
            url: `/getMp4url`,
            method: 'post',
            data: {
                keyvalue: keyValue
            }
        })
        const jsondata = res.data
        let urls = jsonpath.query(jsondata, '$..url')
        let newurls = [...new Set(urls)]
        newurls = newurls.filter(item => typeof item === 'string' && item.includes("/vid/"));
        //从列表中找到分辨率最高的视频地址
        let awwnewurls = newurls.filter(item => {
            //如果包含 1080
            if (item.includes('1280')) {
                console.log(item)
                return true
            }else{
                return false
            }
        })
        if (awwnewurls.length > 0) {
            newurls = awwnewurls
        }
        console.log(newurls)
        const inurl = newurls[0].split('?')[0]
        console.log(inurl)
        //使用浏览器下载这个 inurl
        const res2 = await axios({
            url: inurl,
            method: 'get',
            responseType: 'blob'
        })
        const blob = new Blob([res2.data], { type: 'video/mp4' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'video.mp4'
        a.click()
        window.URL.revokeObjectURL(url)
        alert('下载成功')
    } catch (e) {
        console.log(e)
    }
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