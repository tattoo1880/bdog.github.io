<template>
    <!-- <div :class="{'hidden2':showVideo2}"> -->
    <div>
        <el-row>
            <el-input v-model="keyword" placeholder="请输入关键字" style="width: 800px; margin-left: 100px;"></el-input>
            <el-button type="success" :icon="Search" circle @click="getMovieList(keyword)"
                style="margin-left: 20px;"></el-button>
            <el-button type="warning" :icon="Star" circle @click="findfav"></el-button>
        </el-row>

        <div :class="{ 'hidden': showVideo }" style="margin-left: 50px;">
            <!-- <el-table :data="movieList" style="width: 100%"> -->
            <el-table :data="viewdata" style="width: 100%">
                <el-table-column prop="id" label="编号" width="150"></el-table-column>
                <el-table-column label="缩略图" width="200">
                    <template #default="{ row }">
                        <el-image :src="row.img" alt="" style="width: 200px; height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="名称" width="500"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="{ row }">
                        <el-button type="primary" @click="play(row)" plain>播放</el-button>
                        <el-button type="warning" @click="fav(row)" plain>收藏</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <div>
                <el-pagination v-model:current-page="cpage"
                    hide-on-single-page 
                    style="justify-content: center;"
                    :page-sizes="[10]"  
                    layout="total, sizes, prev, pager, next, jumper" :total="totalItem" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" 
                    />
            </div>

        </div>
        <div :class="{ 'hidden': !showVideo }" style="margin-left: 50px;">
            <el-table :data="movieList2" style="width: 100%">
                <el-table-column prop="id" label="编号" width="150"></el-table-column>
                <el-table-column label="缩略图" width="200">
                    <template #default="{ row }">
                        <el-image :src="row.img" alt="" style="width: 200px; height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="名称" width="500"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="{ row }">
                        <el-button type="primary" @click="play2(row)" plain>播放</el-button>
                        <el-button type="danger" @click="de(row)" plain>删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="Tips" width="80%">
        <!-- <div :class="{'hidden2':!showVideo2}"> -->
        <div class="videobox">
            <video id="videoPlayer" controls width="900" height="600"></video>
        </div>
        <!-- </div> -->
        <template #footer>
            <span class="dialog-footer">
                <el-button type="success" @click="handleclosewindow" plain>
                    关闭视频
                </el-button>
            </span>
        </template>
    </el-dialog>
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
import { ref, onMounted, watch } from 'vue'
import { service3 } from '@/utils/request.js'
import Hls from 'hls.js'
const movieList = ref([])
const movieList2 = ref([])
const keyword = ref()
let k = ref()
const showVideo = ref(false)
const showVideo2 = ref(false)

const totalItem = ref(0)
const cpage = ref(1)
const pageSize = ref(10)
const viewdata = ref([])

const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
}

const handleCurrentChange = (val) => {
    console.log(`当前页: ${val}`);
    cpage.value = val
    //计算现实的数据
    const start = (cpage.value - 1) * pageSize.value
    const end = start + pageSize.value
    viewdata.value = movieList.value.slice(start, end)
    
}

//计算现实的数据




const dialogVisible = ref(false)


onMounted(async () => {
})



const getdata2 = async(kw) =>{
    cpage.value = 1
    let k = []
    let promiselist = []
    const i = 20
    try {
        for (let index = 0; index < i; index++) {
            promiselist.push(service3({
                url: `/movie2/list/${kw}/${index}`,
                method: 'get',
            }))
        }
        const res = await Promise.all(promiselist)
        res.forEach((item) => {
            k = k.concat(item.data)
        })
        console.log(k.length)
        totalItem.value = k.length
        return k
    } catch (error) {
        return k
    }
}




const getdata1 = async (kw) => {
    cpage.value = 1
    let k = []
    const i = 10
    try {
        for (let index = 0; index < i; index++) {
            const res = await service3({
                url: `/movie2/list/${kw}/${index}`,
                method: 'get',
            })
            //将每次请求的数据添加到k中
            k = k.concat(res.data)

        }
        console.log(k.length)
        totalItem.value = k.length
        return k
    } catch (error) {
        return k
    }
}




const getMovieList = async (keyword) => {
    try {
        showVideo.value = true
        let starttime = new Date().getTime()
        const data = await getdata2(keyword)
        movieList.value = data
        viewdata.value = movieList.value.slice(0, pageSize.value)
        showVideo.value = false
        let endtime = new Date().getTime()
        console.log(endtime - starttime)
    } catch (error) {
        console.log(error)
    }
}
import { usePlaypage } from '@/hook/userPlaypage';
const {playitemnewpage} = usePlaypage()
const play = async (href) => {
    console.log(href)
    const data = {
        name: href.title,
        url: href.url
    }
    await playitemnewpage(data)
}

const play2 = async (href) => {
    console.log(href)
    const data = {
        name: href.title,
        url: href.url
    }
    await playitemnewpage(data)
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
        const hls = await gethls(row.url)
        const data = {
            id: row.id,
            title: row.title,
            url: row.url,
            img: row.img,
            hls: hls
        }
        console.log(data)
        const res = await service3({
            url: '/movie2/save',
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
            url: '/movie2/findall',
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
            url: `/movie2/delete/${row.id}`,
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
}
</style>