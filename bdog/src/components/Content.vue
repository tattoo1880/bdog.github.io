<template>
  <!--    使用element-plus 将这个main 的内容模块写出vue3组件-->
  <div class="main">
    <el-container>
      <el-main>
        <!--        撰写的按钮-->
        <div>
          <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 800px">
            撰写
          </el-button>

          <el-dialog v-model="dialogFormVisible" title="撰写文章" width="1080px">
            <el-form :model="form" >
              <el-form-item label="文章标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="简介" :label-width="formLabelWidth">
                <el-input v-model="form.desc" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="文章内容" :label-width="formLabelWidth">
                <MdEditor v-model="form.content" />
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="postarticle">
          Confirm
        </el-button>
      </span>
            </template>
          </el-dialog>
        </div>
        <div>
          <el-table :data="allArticle" style="width: 100% ;margin-left:50px">
            <el-table-column prop="title" label="标题" width="300"></el-table-column>
            <el-table-column prop="desc" label="描述" width="300"></el-table-column>
            <!--           查看按钮-->
            <el-table-column label="操作">
              <template #default="{row}">
                <el-button type="primary" @click="() => handleLook(row)">查看</el-button>
<!--                查看文章的对话框          -->
                <el-dialog title="详情" v-model="contentIs" center>
                  <div class="dialog-header">{{ currentRow.title }}</div>
<!--                  <div class="dialog-content" style="height: 300px">{{ currentRow.content }}</div>-->
                  <MdPreview :editorId="kid" :modelValue="currentRow.content" />

                  <div slot="footer" class="dialog-footer">
                    <el-button @click="contentIs = false">取消</el-button>
                  </div>
                </el-dialog>
<!--                <el-button type="info" @click="handleEdit(row)">编辑</el-button>-->
                <!--                删除-->
                <el-button type="danger" @click="handleDelete(row)" style="margin-left: 30px">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from 'vue'
import service from "@/utils/request.js";

import { MdEditor ,MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';


const formLabelWidth = ref('120px');
const allArticle = reactive(ref([]))
const handleCreate = ref(false)
const dialogFormVisible = ref(false)
const kid = "preview-only"


let form = reactive(
    {
      title: '',
      desc: '',
      content: ''
    }
)
onBeforeMount(async () => {
  try {
    const res = await service.get('/article/all')
    console.log(res.data)
    allArticle.value = res.data
    console.log(allArticle.value)
  } catch (e) {
    console.log(e)
  }
});


const postarticle = async () => {
  try {
    const res = await service.post('/article/create', form)
    dialogFormVisible.value = false
    console.log(res)
    window.location.reload()
  } catch (e) {
    console.log(e)
  }
}
const contentIs = ref(false)
const currentRow = ref(null)
const handleLook = async(row) => {
  contentIs.value = true
  currentRow.value = row
  console.log(row.value)
}

const handleDelete = async(row) => {
  try {
    console.log(row)
    const res = await service.post('/article/delete', row)
    console.log(res)
    window.location.reload()
  } catch (e) {
    console.log(e)
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
