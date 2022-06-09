<template>
  <div class="Page__container shadow" v-loading="loading">
    <h2>总评论排行榜</h2>
    <div class="row" style="justify-content: space-between">
      <div class="col-md-5 group__box shadow mt-4" v-for="item in GroupData" :key="item">
        <div class="group__left">
          <img :src="item.expand.head_img">
          <div>
            <p class="nickname">{{ item.nickname }}</p>
            <p class="url"><a :href="'//' + item.url">{{ url(item.url) }}</a></p>
          </div>
        </div>

        <div class="group__right">
          <el-badge :value="item.count" v-color type="success"></el-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RequestGetGroupComments } from '@/utils/Page/GetGroupComments.js'

const loading = ref(true)

const GroupData = ref({})

const GetGroup = async () => {
  const { data: { data: { data: res } } } = await RequestGetGroupComments()
  GroupData.value = res

  loading.value = false
}

const url = (url) => {
  if (url === '') {
    return '一位热心的网友路过'
  }
  return url
}

GetGroup()

const vColor = {
  mounted (el) {
    const type = ['primary', 'success', 'info', 'warning', 'danger']
    const x = Math.floor(Math.random() * type.length)
    if (x !== 0) {
      el.childNodes[2].className += ' el-badge__content--' + type[x]
    }
  }
}
</script>

<style lang="less" scoped>
@import url('@/assets/Less/Page/MsgWall.less');
</style>
