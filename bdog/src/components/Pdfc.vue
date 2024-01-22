<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script setup>
import { service2 } from '@/utils/request';
import { ref } from 'vue';

const file = ref(null);

// 获取文件对象
function handleFileChange(e) {
  file.value = e.target.files[0];
}

async function uploadFile() {
  // 创建 FormData 对象
  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const res = await service2({
      url: '/convert',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    let fname = res.data.data;
    console.log(fname);
    fname = fname.replace('./static','/static')
    const base_url = 'http://45.147.48.43/apii'
    let file_url = base_url + fname;
    console.log(file_url);
    window.open(file_url);

  } catch (error) {
    console.log(error);
  }
}
</script>
