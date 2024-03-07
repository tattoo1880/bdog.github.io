<template>
  <el-row :gutter="5" justify="center" style="margin-left:230px">
    <el-col :span="8">
      <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 100%" />
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="search">搜索</el-button>
    </el-col>
  </el-row>
    <el-container class="container">
        <el-row>
            <el-col :span="24">
                <el-table :data="rowData" style="width: 100%">
                  <el-table-column label="缩略图" width="200">
                    <template #default="{ row }">
                      <el-image :src="row.img" alt="" style="width: 130px; height: 100px" />
                    </template>
                  </el-table-column>
<!--                    <el-table-column prop="id" label="ID" width="180"></el-table-column>-->
                    <el-table-column prop="name" label="产品名称" width="380"></el-table-column>
                    <el-table-column prop="price" label="价格" width="80" sortable></el-table-column>
<!--                    <el-table-column prop="url" label="详情页面" width="330"></el-table-column>-->
                    <el-table-column label="详情" width="100">
                        <template #default="{ row }">
                            <el-button type="success" plain @click="jump(row.url)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { service7 } from "@/utils/request"

const rowData = ref([])

const page = 1
const searchKeyword = ref("")
const search = async() => {
    const data = await getdata(searchKeyword.value, page)
    rowData.value = data
}
const getdata = async (kw, page) => {
    try {
        const res = await service7({
            url: "/get",
            method: "post",
            data: {
                kw: kw,
                page: page
            }
        })
      console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

const jump = (url) => {
//   跳转到详情页面
    window.open(url, "_blank")
}


onMounted(async () => {
    const data = await getdata("ap tplink", "1")
    rowData.value = data
})

</script>

<style scoped>
.container{
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px
}

</style>
