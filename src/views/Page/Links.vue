<template>
  <div class="Page__container" v-loading="loading">
    <h2>友情链接</h2>
    <div class="row" style="justify-content: space-between">
      <div class="col-md-5 links__box shadow mt-4" v-for="item in LinksData" :key="item.id">
        <a :href="item.url" target="_blank">
            <img :src="item.head_img">
            <div>
              <p class="name">{{ item.name }}</p>
              <p class="description">{{ item.description }}</p>
            </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RequestGetLinks } from '@/utils/Page/GetLinks'

const LinksData = ref({})
const loading = ref(true)

const GetLinks = async () => {
  const { data: { data: { data: res } } } = await RequestGetLinks()
  LinksData.value = res

  loading.value = false
}

GetLinks()
</script>

<style lang="less">
@import url('@/assets/Less/Page/Links.less');
</style>
