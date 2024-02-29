<template>
    <el-row>
        <el-button :type="isFav ? 'success' : 'default'" @click="toggleFav" style="margin-left: 1000px;">
            {{ isFav ? '已关注' : '全部' }}
        </el-button>
    </el-row>
    <el-row>
        <el-switch v-model="value1" active-text="查看收藏" inactive-text="浏览" style="margin-left: 950px;" />
    </el-row>
    <el-row v-if="!value1">
        <el-input v-model="search" placeholder="请输入频道名字" style="width: 300px; margin-left: 600px;" />
        <el-button type="success" @click="searchChannel" style="margin-left: 10px;" plain>搜索</el-button>
    </el-row>
    <el-container v-loading.fullscreen.lock="loading" fullscreen v-if="!value1" class="container">
        <!-- 搜索栏，输入名字，从stardata中筛选出符合的对象 -->
        <el-row v-if="!condition" style="margin-top: 20px;">
            <el-col v-for="(item, index) in ListData" :key="index" :span="7">
                <el-card :body-style="{ padding: '0px' }" class="card">
                    <img :src="item.img" class="image" />
                    <div style="padding: 10px">
                        <p class="title">{{ item.name }}</p>
                        <div class="bottom">
                            <el-button @click="listonechannel(item)" type="success" class="button" :sapn="2"
                                plain>查看</el-button>
                            <el-button v-if="!isFav" @click="fav(item)" type="success" class="button" :sapn="2"
                                plain>收藏</el-button>
                            <el-button v-if="isFav" @click="del(item)" type="success" class="button" :sapn="2"
                                plain>删除</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row v-if="!condition" style="margin-top: 10px;">
            <el-col :span="24">
                <el-pagination v-model:current-page="cpage" v-model:page-size="pageSize1" hide-on-single-page
                    style="margin-top: 10px;margin-left: 150px;" :page-sizes="[15, 30, 90]"
                    layout="total, sizes, prev, pager, next, jumper" :total="totalItem" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </el-col>
        </el-row>
        <el-row v-if="condition">
            <el-button type="info" plain @click="changecondition" style="margin-left:900px;">back</el-button>
            <el-container>
                <el-row v-loading.fullscreen.lock="loading2">
                    <el-table :data="channelMovielistpage" style="width: 100%">
                        <el-table-column prop="id" label="编号" width="150"></el-table-column>
                        <el-table-column label="缩略图" width="200">
                            <template #default="{ row }">
                                <el-image :src="row.img" alt="" style="width: 200px; height: 100px" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称" width="500"></el-table-column>
                        <el-table-column label="操作" width="300">
                            <template #default="{ row }">
                                <el-button type="primary" @click="pl(row)" plain>播放</el-button>
                                <el-button type="success" @click="download(row)" plain>下载</el-button>
                                <el-button type="warning" @click="savestarmovie(row)" plain>收藏</el-button>
                            </template>

                        </el-table-column>
                    </el-table>
                </el-row>
            </el-container>
        </el-row>
        <el-row v-if="condition" style="margin-top: 10px;">
            <el-col :span="24">
                <el-pagination v-model:current-page="cpage2" v-model:page-size="pageSize2" hide-on-single-page
                    style="margin-top: 10px;margin-left: 150px;" :page-sizes="[100, 200]"
                    layout="total, sizes, prev, pager, next, jumper" :total="totalItem2" @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2" />
            </el-col>
        </el-row>
    </el-container>
    <el-dialog v-model="dialogVisible" :title="title" width="80%">
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
    <el-container v-if="value1">
        <el-table :data="starmoviefavlist" style="width: 100%">
            <el-table-column prop="id" label="编号" width="150"></el-table-column>
            <el-table-column label="缩略图" width="200">
                <template #default="{ row }">
                    <el-image :src="row.img" alt="" style="width: 200px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="500"></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <el-button type="primary" @click="pl(row)" plain>播放</el-button>
                    <el-button v-if="!value1" type="warning" @click="savestarmovie(row)" plain>收藏</el-button>
                    <el-button v-if="value1" type="danger" @click="deleteByid(row)" plain>删除</el-button>
                </template>

            </el-table-column>
        </el-table>
    </el-container>
</template>

<script setup>
import { ref, reactive, onMounted, watch,watchEffect } from 'vue'
import Hls from 'hls.js'
import { useRouter } from 'vue-router'
import { service3, service4 } from '@/utils/request';
import { useChannel } from '@/hook/useChannel'   // 引入自定义的hooks
import { usePlaypage } from '@/hook/userPlaypage'   // 引入自定义的hooks
import { useChannelStore } from '@/stores/channel';
const {
    allchanneldata,
    getAllChanneldata
} = useChannelStore()
const { playitemnewpage } = usePlaypage()
const useChannelData = useChannel()
let { getChannelpage, getFav, addFavChannel, deleteFavChannel, listOneChannelMovies } = useChannelData
const dialogVisible = ref(false)
const title = ref()
const condition = ref(false)
let isFav = ref(false)
const loading = ref(false)
const loading2 = ref(false)
// const stardata = ref([])
const ListData = ref([])
const alldata = ref([])
const favdata = ref([])
const value1 = ref(false)
const search = ref('')
const cpage = ref(1)
const cpage2 = ref(1)
const pageSize1 = ref(15)
const pageSize2 = ref(100)
const channelMovielistpage = ref([])
const searchChannel = () => {
    if (search.value == '') {
        ListData.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)
    } else {
        ListData.value = alldata.value.filter(item => {
            return item.name.toLowerCase().includes(search.value.toLowerCase())
        })
    }
}

const totalItem = ref(0)
const totalItem2 = ref(0)
const handleSizeChange = (val) => {
    ListData.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)
}
const handleSizeChange2 = (val) => {
    channelMovielistpage.value = channelMovielist.value.slice((cpage2.value - 1) * pageSize2.value, cpage2.value * pageSize2.value)
}

const handleCurrentChange = (val) => {
    cpage.value = val
    ListData.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)
}
const handleCurrentChange2 = (val) => {
    cpage2.value = val
    channelMovielistpage.value = channelMovielist.value.slice((cpage2.value - 1) * pageSize2.value, cpage2.value * pageSize2.value)
}



const del = async (item) => {
    try {
        await deleteFavChannel(item)
        favdata.value = await getFav()
        ListData.value = favdata.value
    } catch (error) {
        console.log(error);
    }
}
const fav = async (item) => {
    const data = await addFavChannel(item)
}
const toggleFav = () => {
    condition.value = false
    value1.value = false
    isFav.value = !isFav.value
}
//监听isFav的变化，如果isFav为true，就显示favdata，否则显示alldata
watch(isFav, async (newVal) => {
    if (newVal) {
        const data = await getFav()
        ListData.value = data
    } else {
        ListData.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)
    }
})

const channelMovielist = ref([])
watch(value1, async (newVal) => {
    if (newVal) {
        await getstarmoviefavlist()
    }
})
const listonechannel = async (item) => {
    loading2.value = true
    let items = [item]
    // 循环 10 次, 将 item 的 url 变成/0 - /10
    for (let i = 1; i < 41; i++) {
        items.push({
            id: item.id,
            name: item.name,
            img: item.img,
            url: item.url.replace(/\/\d+$/, `/${i}`)
        })
    }
    console.log('items', items);
    let permises = []
    for (let i = 0; i < items.length; i++) {
        permises.push(listOneChannelMovies(items[i]))
    }
    try {
        const data = await Promise.all(permises)
        console.log('data', data);
        let result = []
        for (let i = 0; i < data.length; i++) {
            result = result.concat(data[i])
        }
        condition.value = true
        channelMovielist.value = result
        totalItem2.value = result.length
        channelMovielistpage.value = channelMovielist.value.slice((cpage2.value - 1) * pageSize2.value, cpage2.value * pageSize2.value)
    } catch (error) {
        console.log("error")
    } finally {
        loading2.value = false
    }
}

const changecondition = () => {
    condition.value = false
    cpage2.value = 1
}

const savestarmovie = async (row) => {

    try {
        const res = await service4({
            url: '/movie4/create',
            method: 'post',
            data: row
        })
        if (res.status == 200) {
            alert("收藏成功")
        }
    } catch (error) {
        console.log("error")
    }


}


const deleteByid = async (row) => {
    try {
        const res = await service4({
            url: `/movie4/delete`,
            method: 'post',
            data: row
        })
        await getstarmoviefavlist()
    } catch (error) {
        console.log("error")
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

const starmoviefavlist = ref([])
const getstarmoviefavlist = async () => {
    try {
        const res = await service4({
            url: '/movie4/findall',
            method: 'get',
        })
        starmoviefavlist.value = res.data
    } catch (error) {
        console.log("error")
    }
}
const sleep = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

watchEffect(async()=>{
    console.log('allchanneldata',allchanneldata.value)
    if(!allchanneldata.value){
        await getAllChanneldata()
    }

})


onMounted(async () => {
    console.log('onMounted',allchanneldata.value)
    loading.value = true
    let data1 = await getFav();
    favdata.value = data1
    const data = await useChannelData.getChannelpage("0")
    alldata.value = data
    totalItem.value = alldata.value.length
    ListData.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)

    // const promise = []
    // for (let i = 1; i < 101; i++) {
    //     promise.push(useChannelData.getChannelpage(i.toString()))
    // }
    // const data2 = await Promise.all(promise)
    // for (let i = 0; i < data2.length; i++) {
    //     alldata.value = alldata.value.concat(data2[i])
    // }
    // totalItem.value = alldata.value.length
    loading.value = false
})

const pl = async (row) => {
    await playitemnewpage(row)
}

const download = async (row) => {
    const url = row.url
    try {
        const res = await service3({
            url: '/movie/geturl',
            method: 'post',
            data: {
                url: url
            }
        })
        const downlaodurl = res.data[0].mp4
        //新窗口打开 downlaodurl
        window.open(downlaodurl)
    } catch (error) {
        console.log("error")
    }
}

</script>

<style scoped>
.image {
    /* width: 290px; */
    width: 100%;
    height: 150px;
    display: block;
}

.card {
    /* width: 300px; */
    display: flex;
    flex-direction: column;
    width: 220px;
    margin-top: 20px;
    /* padding-left: 10px; */
    height: 250px;
    border: 1px solid rgb(36, 104, 36);
    border-radius: 5px;
    box-shadow: 0 0 10px #0f0;
    min-width: 250px;
    /* 彼此间距为10px */
}

.title {
    /* 字体加粗 */
    font-weight: bold;
    height: 10px;
    font-family: sans-serif;
    color: #0f0;
    padding-right: 5px;
    margin-left: 10px;
    margin-top: 3px
        /* animation: glow 3s ease-in-out infinite alternate; */
}

.button {
    /* 距离父组件底部2px */
    margin-bottom: 2px;
    /* 距离父组件左边距离2px */
    margin-left: 35px;
    margin-top: 20px;
}

.videobox {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

.container {
    width: 80vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 40px;
}
</style>