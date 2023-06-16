## 介绍

ts 实现 对 xhr 封装 实现 axios
使用 vite 打包发布

使用例子 vue3：

```
<script lang="ts" setup>
import { ref } from 'vue'
import axios from '@lqcoder/axios'


//测试 下载 进度条

const progress = ref('0')

//测试 上传文件进度条
const fileRef = ref<HTMLInputElement | null>()
let file: File

const handle = () => {
  if (fileRef.value && fileRef.value.files) {
    file = fileRef.value.files[0]
  }
}

const upload = () => {
  if (!file) alert('未选择文件')
  let formData = new FormData()
  formData.append('file', file)
  axios({
    method: 'post',
    url: 'api/uploadFile',
    data: formData,
    onUploadProgress(e) {
      console.log(3333333, e)
      progress.value = (e.loaded / e.total).toFixed(2)
    }
  })

}


</script>

<template>
  <section>app====下载进度{{ progress }}</section>
  <section>
    选择文件
    <input ref="fileRef" type="file" accept="*" @change="handle" />
  </section>
  <button @click="upload">上传文件</button>
</template>

```
