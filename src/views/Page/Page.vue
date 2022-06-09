<template>
  <div class="Page__container shadow" v-loading="loading">
    <h2 class="Page__title">{{ PageData.title }}</h2>
    <div class="Page__info">
      <p>发布于<span class="ps-2">{{ PageData.create_time }}</span></p>
    </div>
    <div class="Page-content" v-html="PageData.content"></div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { RequestGetPage } from '@/utils/Page/GetPage'

const props = defineProps(['alias'])

const loading = ref(true)

const PageData = ref({

})

const GetPage = async (alias) => {
  const { data: { data: res } } = await RequestGetPage(alias)
  PageData.value = res

  loading.value = false
}

onBeforeRouteUpdate((to, from, next) => {
  loading.value = true

  GetPage(to.params.alias)
  next()
})

GetPage(props.alias)

</script>

<style lang="less">
@import url('@/assets/Less/Page/Page.less');
</style>
