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
        <el-input v-model="search" placeholder="请输入明星名字" style="width: 300px; margin-left: 600px;" />
        <el-button type="success" @click="searchStar" style="margin-left: 10px;" plain>搜索</el-button>
    </el-row>
    <el-container v-loading.fullscreen.lock="loading" fullscreen v-if="!value1" class="container">
        <!-- 搜索栏，输入名字，从stardata中筛选出符合的对象 -->
        <el-row v-if="!condition" style="margin-top: 20px;">
            <el-col v-for="(item, index) in stardata" :key="index" :span="7">
                <el-card :body-style="{ padding: '0px' }" class="card">
                    <img :src="item.img" class="image" />
                    <div style="padding: 10px">
                        <p class="title">{{ item.name }}</p>
                        <div class="bottom">
                            <!-- <p class="sum" :sapn="3">&emsp;&emsp;&emsp;{{ item.url }}</p> -->
                            <el-button @click="listonestar(item)" type="success" class="button" :sapn="2"
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
            <el-col :span="24"> <el-pagination v-model:current-page="cpage" hide-on-single-page
                style="margin-top: 10px;margin-left: 150px;" :page-sizes="[15]" layout="total, sizes, prev, pager, next, jumper"
                :total="totalItem" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            
            </el-col>
        </el-row>
        <el-row v-if="condition">
            <el-button type="info" plain @click="changecondition" style="margin-left:900px;">back</el-button>
            <el-container>
                <el-row>
                    <el-table :data="starmovielist" style="width: 100%">
                        <el-table-column prop="id" label="编号" width="150"></el-table-column>
                        <el-table-column label="缩略图" width="200">
                            <template #default="{ row }">
                                <el-image :src="row.img" alt="" style="width: 200px; height: 100px" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称" width="500"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="{ row }">
                                <el-button type="primary" @click="playitem(row)" plain>播放</el-button>
                                <el-button type="warning" @click="savestarmovie(row)" plain>收藏</el-button>
                            </template>

                        </el-table-column>
                    </el-table>
                </el-row>
            </el-container>
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
                    <el-button type="primary" @click="playitem(row)" plain>播放</el-button>
                    <el-button v-if="!value1" type="warning" @click="savestarmovie(row)" plain>收藏</el-button>
                    <el-button v-if="value1" type="danger" @click="deleteByid(row)" plain>删除</el-button>
                </template>

            </el-table-column>
        </el-table>
    </el-container>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import Hls from 'hls.js'
import { service3, service4 } from '@/utils/request';
const dialogVisible = ref(false)
const title = ref()
const condition = ref(false)
let isFav = ref(false)
const loading = ref(false)
const stardata = ref([])
const alldata = ref([])
const favdata = ref([])
const value1 = ref(false)
const search = ref('')
const cpage = ref(1)
const searchStar = () => {
    if (search.value == '') {
        stardata.value = alldata.value
    } else {
        stardata.value = alldata.value.filter(item => {
            console.log(search.value)
            console.log(item.name)
            //忽略大小写
            return item.name.toLowerCase().includes(search.value.toLowerCase())
        })
    }
}
const initializeHLS = async (url) => {
    var video = document.getElementById('videoPlayer');

    if (Hls.isSupported()) {
        var hls = new Hls();
        console.log('hls', url);
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
const totalItem = ref(0)
const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);

}

const handleCurrentChange = (val) => {
    console.log(`当前页: ${val}`);
    cpage.value = val
    //计算现实的数据
    stardata.value = alldata.value.slice((cpage.value - 1) * 15, cpage.value * 15)
    console.log(stardata.value);
    console.log(alldata.value);
}

const getStar = async () => {
    try {
        cpage.value = 1
        loading.value = true
        const res = await service4({
            url: '/movie3/star',
            method: 'get',
        })
        console.log("====")
        console.log(res.data);
        totalItem.value = res.data.length
        alldata.value = res.data
        stardata.value = alldata.value.slice(0, 15)
        loading.value = false
    } catch (error) {
        console.log(error);
    }
}

const getfav = async () => {
    try {
        const res = await service4({
            url: '/movie3/findall',
            method: 'get',
        })
        console.log("====")
        console.log(res.status);


        favdata.value = res.data
    } catch (error) {
        console.log(error);
    }
}

const del = async (item) => {
    console.log(item);
    try {
        const res = await service4({
            url: `/movie3/delete/${item.id}`,
            method: 'get',
        })
        await getfav()
        stardata.value = favdata.value
    } catch (error) {
        console.log(error);
    }


}


const fav = async (item) => {
    console.log(item);
    try {
        const res = await service4({
            url: '/movie3/create',
            method: 'post',
            data: item
        })
        console.log(res.status)
        if (res.status == 200) {
            alert("收藏成功")
        }
        // console.log(res.data);
    } catch (error) {
        // console.log(error);
        console.log("error")
        alert("已收藏")
    }

}
const toggleFav = () => {
    condition.value = false
    value1.value = false
    isFav.value = !isFav.value
}

//监听isFav的变化，如果isFav为true，就显示favdata，否则显示alldata
watch(isFav, async (newVal) => {
    if (newVal) {
        await getfav()
        stardata.value = favdata.value
    } else {
        stardata.value = alldata.value
    }
})

const starmovielist = ref([])
watch(value1, async (newVal) => {
    if (newVal) {
        await getstarmoviefavlist()
    }
})
const listonestar = async (item) => {
    // console.log(item);
    console.log(item);
    try {
        const res = await service4({
            url: `/movie4/onestarlist`,
            method: 'post',
            data: item
        })
        console.log(res.status);
        console.log(res.data);
        condition.value = true
        starmovielist.value = res.data
    } catch (error) {
        console.log("error")
    }
}

const changecondition = () => {
    condition.value = false
    starmovielist.value = alldata.value.slice((cpage.value - 1) * 15, cpage.value * 15)
}

const savestarmovie = async (row) => {

    console.log(row)
    try {
        const res = await service4({
            url: '/movie4/create',
            method: 'post',
            data: row
        })
        console.log(res.status)
        if (res.status == 200) {
            alert("收藏成功")
        }
        console.log(res.data);
    } catch (error) {
        console.log("error")
    }


}


const playitem = async (row) => {
    let url = row.url
    title.value = row.name
    console.log(url)
    try {
        const res = await service3({
            url: '/movie/geturl',
            method: 'post',
            data: {
                url: url
            }
        })
        console.log(res.data)
        const playurl = res.data
        dialogVisible.value = true
        initializeHLS(playurl)
    } catch (error) {
        console.log("error")
    }

}

const deleteByid = async (row) => {
    console.log(row)
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
        console.log(res.status);
        console.log(res.data);
        starmoviefavlist.value = res.data
    } catch (error) {
        console.log("error")
    }
}



onMounted(async () => {
    //同时执行getStar和getfav
    await Promise.all([getStar(), getfav()])
})



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