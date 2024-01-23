<template>
    <!-- 搜索form -->
    <div>
        <el-row>
            <el-col :span="12" style="margin-left: 250px">
                <el-input v-model="searchKeyword" placeholder="搜索"></el-input>
            </el-col>
            <el-col :span="4" style="margin-left: 5px">
                <!--              <el-button type="danger" @click="SearchItem">搜索</el-button>-->
                <el-button type="success" :icon="Search" circle @click="SearchItem" />
            </el-col>
        </el-row>
    </div>
    <div>
        <el-row>
            <el-col :span="12" style="margin-left: 250px">
                <el-input v-model="searchLibKeyword" placeholder="搜索本地数据库"></el-input>
            </el-col>
            <el-col :span="4" style="margin-left: 5px">
                <!--              <el-button type="danger" @click="SearchItem">搜索</el-button>-->
                <el-button type="warning" :icon="Search" circle @click="SearchLibItem" />
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
                    <el-button type="primary" @click="palyvideo(row.url)" class="button_one" plain>
                        播放
                    </el-button>
                    <el-button v-show="showButton" type="success" @click="domyfav(row)" class="button_one" plain>
                        收藏
                    </el-button>
                    <el-button v-show="showButton2" type="danger" @click="del(row)" class="button_one" plain>
                        删除
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
import { service2 } from '@/utils/request';
const searchKeyword = ref()
const showVideo = ref(false)
const tableData = ref()
const showButton = ref(true)
const showButton2 = ref(false)
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


//读取后段所有数据库的数
let getAlllib = async () => {
    try {
        const res = await service2.get('/getMovies')
        console.log(res.data)
        tableData.value = res.data.data
        showButton.value = false
        showButton2.value = true
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    // 在组件挂载后初始化HLS.js
    initializeHLS();
    getAlllib()
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
        showButton.value = true
        showButton2.value = false
    } catch (error) {
        console.log(error)
    }
}

const searchLibKeyword = ref()
const SearchLibItem = async () => {
    try {
        showVideo.value = false
        const res = await service2.post('/getMoviesByKw', {
            'data': searchLibKeyword.value
        })
        console.log(res.data)
        tableData.value = res.data.data
        showButton.value = false
        showButton2.value = true
    } catch (error) {
        console.log(error)
    }
}


const domyfav = async (row) => {
    try {
        const res = await service2.post('/createMovie', {
            'data': row
        })
        console.log(res.data)
        alert("收藏成功")
    } catch (error) {
        console.log(error)
    }
}

const del = async (row) => {
    try {
        const res = await service2.post('/delMovie', {
            'data': row
        })
        console.log(res.data)
        alert("删除成功")
        getAlllib()
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
}
</style>