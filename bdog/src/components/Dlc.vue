<template>
    <el-row class="oel">
        <el-input v-model="input" placeholder="请输入内容" class="sinput"></el-input>
        <el-input v-model="filename" placeholder="请输入文件名" class="nameinput" />
        <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="download" type="warning" plain>下载</el-button>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { service6 } from '@/utils/request'
import jsonpath from "jsonpath";
import axios from 'axios'
const fullscreenLoading = ref(false)
const input = ref('')
const newurls = ref([])
const filename = ref('')
const download = async () => {
    fullscreenLoading.value = true
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
            } else {
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
        try {
            const res2 = await axios({
                url: inurl,
                method: 'get',
                responseType: 'blob'
            })
            const blob = new Blob([res2.data], { type: 'video/mp4' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${filename.value}.mp4`
            a.click()
            window.URL.revokeObjectURL(url)
            alert('下载成功')
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    } finally {
        filename.value = ''
        input.value = ''
        fullscreenLoading.value = false
    }
}

</script>

<style scoped>
.sinput {
    width: 600px;
    border: 1px solid #13eb2c;
}

.nameinput {
    width: 150px;
    border: 1px solid #13eb2c;

}


.oel {
    margin-top: 120px;
    display: flex;
    justify-content: space-evenly;
}
</style>