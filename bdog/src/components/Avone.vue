<template>
    <!-- 搜索form -->
    <div>
        <el-row>
            <el-col :span="12" style="margin-left: 250px">
                <el-input v-model="searchKeyword" placeholder="搜索"></el-input>
            </el-col>
            <el-col :span="4" style="margin-left: 5px">
                <!--              <el-button type="danger" @click="SearchItem">搜索</el-button>-->
                <el-button type="info" :icon="Search" circle @click="SearchItem" />
            </el-col>
        </el-row>
    </div>
    <div :class="{ 'hidden': showVideo }">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号">
                <template #default="{ row }">
                    <el-image :src="row.img" style="width: 300px; height: 200px"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="片名" width="300" />
            <el-table-column prop="url" label="原视频链接" width="400" />
            <el-table-column label="内容">
                <template #default="{ row }">
                    <el-button type="primary" @click="palyvideo(row.url)" class="button_one">
                        播放
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="videobox">
        <video id="videoPlayer" controls width="900" height="600" :class="{ 'hidden': !showVideo }"></video>
        <!-- <div :class="{ 'hidden': !showVideo }">
            <div class="buttoncard">
                <el-button v-for="(playlistItem, index) in plist" :key="index" type="primary" target="_blank"
                    @click="palyvideo(playlistItem, plist)" class="button_one">
                    {{ index + 1 }}
                </el-button>
            </div>
        </div> -->
    </div>
</template>
    
<script setup>
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import Hls from 'hls.js';
import { ref, onMounted } from 'vue';
import {service2} from '@/utils/request';
const searchKeyword = ref()
const showVideo = ref(false)
const tableData = ref()
const plist = ref()
const initializeHLS = async (url) => {
    var video = document.getElementById('videoPlayer');

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'path/to/your/hls/playlist.m3u8';
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}
onMounted(() => {
    // 在组件挂载后初始化HLS.js
    initializeHLS();
});

const palyvideo = async (playurl) => {
    console.log(playurl)
    try {
        const res = await service2.post('/getm3u8', {
            'data': playurl
        })
        console.log(res.data.data)
        showVideo.value = true
        initializeHLS(res.data.data)
    } catch (error) {
        console.log(error)
    }
}

const SearchItem = async () => {
    try {
        showVideo.value = false
        const res = await service2.post('/getlist', {
            'data': searchKeyword.value
        })
        console.log(res.data)
        tableData.value = res.data.data
    } catch (error) {
        console.log(error)
    }
}

</script>
<style scoped>
.hidden {
    display: none;
}

.button_one {
    width: 60px;
    height: 30px;
    display: inline-block;
    padding: 5px;
    /* 调整按钮内部内容与按钮边框的间距 */
    margin: 5px;
    /* 调整按钮之间的垂直和水平间距 */
}

.videobox {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

.buttoncard {
    width: 600px;
    height: 300px;
}</style>