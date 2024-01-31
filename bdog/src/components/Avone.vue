<template>
 <!-- <div :class="{'hidden2':showVideo2}"> -->
 <div>
    <el-row>
        <el-input v-model="keyword" placeholder="请输入关键字" style="width: 800px;"></el-input>
        <el-button type="primary" @click="getMovieList(keyword)" style="margin-left: 20px;width: 80px;">搜索</el-button>
        <el-button type="warning" @click="findfav" style="width: 80px;">搜索收藏</el-button>
    </el-row>

    <div :class="{ 'hidden': showVideo }">
        <el-table :data="movieList"  style="width: 100%">
            <el-table-column label="序号" width="60">
                <template #default="{ row }">
                    {{ row.$index }}
                </template>
            </el-table-column>
            <el-table-column label="缩略图" width="180">
                <template #default="{ row }">
                    <el-image :src="row.img" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column prop="href" label="名称" width="740"></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <el-button type="primary" @click="play(row.href)">播放</el-button>
                    <el-button type="warning" @click="fav(row)">收藏</el-button>
                </template>

            </el-table-column>
        </el-table>
    </div>
    <div :class="{ 'hidden': !showVideo }">
        <el-table :data="movieList2"  style="width: 100%">
            <el-table-column prop="id" label="名称" width="60"></el-table-column>
            <el-table-column label="缩略图" width="180">
                <template #default="{ row }">
                    <el-image :src="row.img" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column prop="url" label="名称" width="740"></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <el-button type="primary" @click="play2(row.hls)">播放</el-button>
                    <el-button type="danger" @click="de(row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
    </div>
 </div>
 <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="80%"
  >
  <!-- <div :class="{'hidden2':!showVideo2}"> -->
    <div class="videobox">
        <video id="videoPlayer" controls width="900" height="600" ></video>
    </div>
  <!-- </div> -->
  <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="handleclosewindow">
          关闭视频
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { service3 } from '@/utils/request.js'
import Hls from 'hls.js'
const movieList = ref([])
const movieList2 = ref([])
const keyword = ref()
let k = ref()
const showVideo = ref(false)
const showVideo2 = ref(false)


const dialogVisible = ref(false)


onMounted(async() => {
    initializeHLS(' ');
})


const initializeHLS = async (url) => {
    var video = document.getElementById('videoPlayer');

    if (Hls.isSupported()) {
        var hls = new Hls();
        console.log('hls',url);
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




const getMovieList = async (keyword) => {
    try {
        showVideo.value = true
        const res = await service3({
            url: `/movie/list/${keyword}`,
            method: 'get',
        })
        console.log(res.data)
        k = res.data[0]
        // 为k的每个元素添加一个$index属性
        k.forEach((item, index) => {
            item.$index = index + 1
        })
        movieList.value = k
        showVideo.value = false
    } catch (error) {
        console.log(error)
    }
}

const play = async (href) => {
    try {
        dialogVisible.value = true
        // showVideo2.value = true
        const res = await service3({
            url: '/movie/geturl',
            method: 'post',
            data: {
                url: href
            }
        })
        console.log(res.data)
        console.log(res.data)
        initializeHLS(res.data)
    } catch (error) {
        console.log(error)
    }
}

const play2 = async (href) => {
    try {
        dialogVisible.value = true
        // showVideo2.value = true
        console.log(href)
        initializeHLS(href)
    } catch (error) {
        console.log(error)
    }
}

const gethls = async (href) => {
    try {
        console.log(href)
        const res = await service3({
            url: '/movie/geturl',
            method: 'post',
            data: {
                url: href
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const fav = async (row) => {
    try {
        console.log(row)
        const hls = await gethls(row.href)
        const data = {
            url: row.href,
            img: row.img,
            hls: hls
        }
        const res = await service3({
            url: '/movie/save',
            method: 'post',
            data: data
        })
        console.log(res)
        if (res.status == 200) {
            alert('收藏成功')
        } else {
            alert('收藏失败')
        }

    } catch (error) {
        console.log(error)
    }
}

const findfav = async () => {
    try {
        const res = await service3({
            url: '/movie/findall',
            method: 'get'
        })
        console.log(res.data)
        movieList2.value = res.data
        showVideo.value = true
    } catch (error) {
        console.log(error)
    }
}

const de = async (row) => {
    try {
        console.log(row)
        const res = await service3({
            url: `/movie/delete/${row.id}`,
            method: 'get'
        })
        console.log(res)
        if (res.status == 200) {
            alert('删除成功')
            await findfav()
        } else {
            alert('删除失败')
        }
    } catch (error) {
        console.log(error)
    }
}

const handleclosewindow = async () => {
    try {
        dialogVisible.value = false
        const video = document.getElementById('videoPlayer');
        video.pause();
        video.src = '';
    } catch (error) {
        console.log(error)
    }
}
</script>

<style scoped>
.hidden {
    display: none;
}

.hidden2 {
    display: none;
}

.videobox {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}</style>