<template>
    <el-row class="el-row">
        <el-row>
            <el-col :span="23">
                <h1>{{ name }}</h1>
            </el-col>
            <el-col :span="1">
                <el-button type="success" @click="closevideo" plain class="button">关闭</el-button>
            </el-col>
        </el-row>
        <el-row>

            <video id="videoPlayer" controls autoplay class="videoplayer"></video>
        </el-row>
    </el-row>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { service3 } from '../utils/request'
import { useRouter } from 'vue-router'
import Hls from 'hls.js'
const useroute = useRouter()
const initializeHLS = async (url) => {
    var video = document.getElementById('videoPlayer');

    if (Hls.isSupported()) {
        var hls = new Hls();
        // console.log('hls', url);
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}
//接受路由传递参数
const { name, url } = defineProps(["name", "url"])
console.log(name, url)

const playitem = async (url) => {
    try {
        const res = await service3({
            url: '/movie/geturl',
            method: 'post',
            data: {
                url: url
            }
        })
        // console.log(res.data)
        const playurl = res.data[0].hls
        console.log(playurl)
        initializeHLS(playurl)
    } catch (error) {
        console.log("error")
    }
}
onMounted(() => {
    playitem(url)
})

const closevideo = async () => {

    const video = document.getElementById('videoPlayer');
    video.pause();
    video.src = '';
    // 回退到上一页面
    useroute.back()
    // useroute.push({ name: 'channel' })

}




</script>

<style scoped>
.el-row {
    /* display: flex; */
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    margin-top: 30px;

}

.videoplayer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1024px;
}
</style>