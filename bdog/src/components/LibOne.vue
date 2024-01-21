<template>
    <div>
              <el-button type="success" :icon="Edit" circle @click="dialogFormVisible = true" style="float: right;"/>
    </div>
        <div>
            <el-dialog v-model="dialogFormVisible" title="撰写" width="1280px">
            <el-form :model="form" >
              <el-form-item label="文章标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="简介" :label-width="formLabelWidth">
                <el-input v-model="form.desc" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="文章内容" :label-width="formLabelWidth">
                <el-input v-model="form.content" autocomplete="off"/>
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="postarticle">
          确认
        </el-button>
      </span>
            </template>
          </el-dialog>
        </div>
        <div>

    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="主题" width="200" />
        <el-table-column prop="desc" label="简述" width="300" />
        <el-table-column prop="content" label="内容" />
    </el-table>
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
import service from '@/utils/request';
import { ref, reactive, onBeforeMount } from 'vue'
const formLabelWidth = ref('120px');
const tableData = reactive(ref())
let form = reactive(
    {
      title: '',
      desc: '',
      content: ''
    }
)

const dialogFormVisible = ref(false)
// 像后端请求数据
const getData = async () => {
    try {
        const res = await service.get('/lib/all')
        // console.log('-------', res.data)
        tableData.value = res.data
        // console.log('-------', tableData)
    } catch (error) {
        console.log(error)
    }
}
getData()

const postarticle = async () => {
    try {
        console.log(form)
        const res = await service.post('/lib/create', form)
        console.log('-------', res.data)
        dialogFormVisible.value = false
        await getData()
    } catch (error) {
        console.log(error)
    }
}
</script>

<style scoped>
.content {
  text-align: center;
}
.dialog-header {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.dialog-content {
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>