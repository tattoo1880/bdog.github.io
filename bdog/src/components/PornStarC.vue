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
                <el-row>
                    <el-table :data="showVal" style="width: 100%">
                        <el-table-column prop="id" label="编号" width="150"></el-table-column>
                        <el-table-column label="缩略图" width="200">
                            <template #default="{ row }">
                                <el-image :src="row.img" alt="" style="width: 200px; height: 100px" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称" width="500"></el-table-column>
                        <el-table-column label="操作" width="300">
                            <template #default="{ row }">
                                <el-button type="primary" @click="playitem(row)" plain>播放</el-button>
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
                    style="margin-top: 10px;margin-left: 150px;" :page-sizes="[100,200]"
                    layout="total, sizes, prev, pager, next, jumper" :total="totalItem2"
                    @size-change="handleSizeChange2" @current-change="handleCurrentChange2" />
            </el-col>
        </el-row>
    </el-container>
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
                    <el-button type="danger" @click="deleteByid(row)" plain>删除</el-button>
                </template>

            </el-table-column>
        </el-table>
    </el-container>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { usePlaypage } from '@/hook/userPlaypage'   // 引入自定义的hooks
import Hls from 'hls.js'
import { service3, service4 } from '@/utils/request';
import { useStar } from '@/hook/useStar'
const { getStarpage } = useStar()
const { playitemnewpage } = usePlaypage()
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
const cpage2 = ref(1)
const pageSize1 = ref(60)
const pageSize2 = ref(100)
const searchStar = () => {
    if (search.value == '') {
        stardata.value = alldata.value
    } else {
        stardata.value = alldata.value.filter(item => {
            // console.log(search.value)
            // console.log(item.name)
            //忽略大小写
            return item.name.toLowerCase().includes(search.value.toLowerCase())
        })
    }
}
const totalItem = ref(0)
const totalItem2 = ref(0)
const showVal = ref([])
const handleSizeChange = (val) => {
    // console.log(`每页 ${val} 条`);
    stardata.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)
}
const handleSizeChange2 = (val) => {
    // console.log(`每页 ${val} 条`);
    showVal.value = starmovielist.value.slice((cpage2.value - 1) * pageSize2.value, cpage2.value * pageSize2.value)
}

const handleCurrentChange = (val) => {
    // console.log(`当前页: ${val}`);
    cpage.value = val
    //计算现实的数据
    // console.log(alldata.value.length)
    // console.log((cpage.value - 1) * 15, cpage.value * 15)
    stardata.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)
    // console.log(stardata.value);
    // console.log(alldata.value);
}

const handleCurrentChange2 = (val) =>{
    cpage2.value = val
    showVal.value = starmovielist.value.slice((cpage2.value - 1) * pageSize2.value, cpage2.value * pageSize2.value)

}




const getStar = async () => {
    try {
        cpage.value = 1
        const res = await service4({
            url: '/movie3/star',
            method: 'get',
            params: {
                page: "0",
            }
        })
        // console.log("====")
        console.log(res.data);
        totalItem.value = res.data.length
        alldata.value = res.data
        stardata.value = alldata.value.slice(0, pageSize1.value)
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
        // console.log("====")
        // console.log(res.status);


        favdata.value = res.data
    } catch (error) {
        console.log(error);
    }
}

const del = async (item) => {
    // console.log(item);
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
    // console.log(item);
    try {
        const res = await service4({
            url: '/movie3/create',
            method: 'post',
            data: item
        })
        // console.log(res.status)
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
    let items = [item]
    for (let i = 1; i <= 20; i++) {
        items.push({
            name: item.name,
            img: item.img,
            url: item.url.replace(/\/\d+$/, `/${i}`),
            id: item.id
        })
    }
    let permises = []
    let result = []
    //for (let i = 0; i < items.length; i++) {
      //  permises.push(getStarpage(items[i]))
    //}
    permises = items.map(item => getStarpage(item))
    try {
        let res = await Promise.all(permises)
        // for (let i = 0; i < res.length; i++) {

        //     result = result.concat(res[i])
        // }
        result = res.reduce((acc, val) => acc.concat(val), []);
        starmovielist.value = result
        condition.value = true
        showVal.value = starmovielist.value.slice(0, pageSize2.value)
        totalItem2.value = starmovielist.value.length

    } catch (error) {
        console.log(error);
    }
}

const changecondition = () => {
    condition.value = false
    // starmovielist.value = alldata.value.slice((cpage.value - 1) * pageSize1.value, cpage.value * pageSize1.value)
    cpage2.value = 1
}

const savestarmovie = async (row) => {

    // console.log(row)
    try {
        const res = await service4({
            url: '/movie4/create',
            method: 'post',
            data: row
        })
        // console.log(res.status)
        if (res.status == 200) {
            alert("收藏成功")
        }
        // console.log(res.data);
    } catch (error) {
        console.log("error")
    }


}

const playitem = async (row) => {
    await playitemnewpage(row)
}
const download = async (row) => {
    const url = row.url
    console.log("==========", url)
    try {
        const res = await service3({
            url: '/movie/geturl',
            method: 'post',
            data: {
                url: url
            }
        })
        const downlaodurl = res.data[0].mp4
        // console.log(downlaodurl)
        //新窗口打开 downlaodurl
        window.open(downlaodurl)
    } catch (error) {
        console.log("error")
    }
}


const deleteByid = async (row) => {
    // console.log(row)
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
        // console.log(res.status);
        // console.log(res.data);
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


onMounted(async () => {
    loading.value = true
    //同时执行getStar和getfav
    await Promise.all([getStar(), getfav()])
    totalItem.value = alldata.value.length
    const promise = []
    for (let i = 1; i < 130; i++) {
        // await sleep(1000)
        //i 变成字符串
        // let stri = i.toString()
        // await refreshdata(stri)
        promise.push(refreshdata(i.toString()))
    }
    await Promise.all(promise)
    totalItem.value = alldata.value.length
    loading.value = false

})


const refreshdata = async (page) => {

    try {
        const res = await service4({
            url: '/movie3/star',
            method: 'get',
            params: {
                page: page,
            }
        })

        alldata.value.push(...res.data)
    } catch (error) {
        console.log(error)
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