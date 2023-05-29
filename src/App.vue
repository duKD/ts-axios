<script lang="ts" setup>
import { ref } from 'vue'
import axios from '../lib/axios'

const name = ref('name')

axios({ url: 'api/hello' })
</script>

<template>
  <section>app===={{ name }}</section>
</template>
