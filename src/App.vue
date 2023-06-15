<script lang="ts" setup>
import { ref } from 'vue'
import qs from 'qs'
import axios, { AxiosError } from '../lib/axios'

axios.interceptors.request.use((config) => {
  return config
})

axios.interceptors.request.use((config) => {
  return config
})

const name = ref('name')

const CancelToken = axios.CancelToken

const source = CancelToken.source()

let cancel: any

axios<{ data: { age: string } }>({
  url: 'api/hello',
  headers: {
    test: '123'
  },
  params: { age: 18, name: 'ws' },
  cancelToken: new CancelToken(function (e) {
    cancel = e
  })
})
  .then((res) => {
    console.log(444, res.data.data.age)
  })
  .catch((e: AxiosError) => {
    console.log(5555, e.message)
  })

setTimeout(() => {
  cancel('cancel-----')
}, 200)

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
</script>

<template>
  <section>app===={{ name }}</section>
</template>
