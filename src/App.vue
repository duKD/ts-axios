<script lang="ts" setup>
import { ref } from 'vue'
import axios, { AxiosError } from '../lib/axios'

const name = ref('name')

axios<{ data: { age: string } }>({
  url: 'api/hello',
  timeout: 5000,
  params: { age: 18, name: 'ws' }
})
  .then((res) => {
    console.log(444, res.data.data.age)
  })
  .catch((e: AxiosError) => {
    console.log(5555, e.message)
  })

axios('api/createDto', { method: 'post', data: { age: 18, name: 'ws' } })

const searchParams = new URLSearchParams('q=URLUtils.searchParams&topic=api')
axios({
  method: 'post',
  url: 'api/searchParams',
  // responseType: 'json',
  data: searchParams
})
  .then((res) => {
    console.log('response=====', res)
  })
  .catch((e: AxiosError) => {
    console.log(88888, e.message, e.response)
  })
</script>

<template>
  <section>app===={{ name }}</section>
</template>
