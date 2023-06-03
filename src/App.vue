<script lang="ts" setup>
import { ref } from 'vue'
import axios from '../lib/axios'

const name = ref('name')

// axios({ url: 'api/hello', params: { age: 18, name: 'ws' } })
// axios({ url: 'api/createDto', method: 'post', data: { age: 18, name: 'ws' } })

const searchParams = new URLSearchParams('q=URLUtils.searchParams&topic=api')
axios({
  method: 'post',
  url: 'api/searchParams',
  // responseType: 'json',
  data: searchParams
}).then((res) => {
  console.log('response=====', res)
})
</script>

<template>
  <section>app===={{ name }}</section>
</template>
