<script lang="ts" setup>
import { ref } from 'vue'
import qs from 'qs'
import axios, { AxiosError } from '../lib/axios'

console.log(4444444, qs.stringify({ name: 'kd', age: 23 }))

// axios.interceptors.request.use((config) => {
//   return config
// })

// axios.interceptors.request.use((config) => {
//   return config
// })

// const name = ref('name')

// const CancelToken = axios.CancelToken

// const source = CancelToken.source()

// let cancel: any

// axios<{ data: { age: string } }>({
//   url: 'api/hello',
//   headers: {
//     test: '123'
//   },
//   params: { age: 18, name: 'ws' },
//   cancelToken: new CancelToken(function (e) {
//     cancel = e
//   })
// })
//   .then((res) => {
//     console.log(444, res.data.data.age)
//   })
//   .catch((e: AxiosError) => {
//     console.log(5555, e.message)
//   })

// setTimeout(() => {
//   cancel('cancel-----')
// }, 200)

// axios('api/createDto', {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//   },
//   transformRequest: function (data) {
//     return qs.stringify(data)
//   },
//   data: { name: 'kd' }
// })

// const searchParams = new URLSearchParams('q=URLUtils.searchParams&topic=api')

// axios({
//   method: 'post',
//   url: 'api/searchParams',
//   // responseType: 'json',
//   data: searchParams
// })
//   .then((res) => {
//     console.log('response=====', res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(88888, e.message, e.response)
//   })

//测试 下载 进度条

const progress = ref('0')
// axios({
//   method: 'get',
//   url: 'file/wxf.mp3',
//   responseType: 'blob',
//   onDownloadProgress(e) {
//     console.log(3333333, e)
//     progress.value = (e.loaded / e.total).toFixed(2)
//   }
// }).then((res) => {
//   console.log(999999, res)
// })

//测试 上传文件进度条
const fileRef = ref<HTMLInputElement | null>()
let file: File

const handle = () => {
  if (fileRef.value && fileRef.value.files.length) {
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
