<template>
  <div class="Header-container">
    <div class="container-lg">
      <div class="row">
        <!-- 左侧LOGO -->
        <div class="col-2 align-self-start">
          <a href="https://www.xxhzm.cn" class="Header__logo"><img :src="store.getters.logo"></a>
        </div>
        <!-- 中间导航栏 -->
        <div class="col-5 align-self-center">
          <ul class="Header__nav">
            <li><router-link to="/">首页</router-link></li>
            <li v-for="item in store.getters.page" :key="item.id"><router-link to="">{{ item.title }}</router-link></li>
          </ul>
        </div>
        <!-- 右侧功能页 -->
        <div class="col align-self-end">
          One of three columns
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { AxiosGetPage } from '@/utils/Page/GetPage'

// 发送 ajax 获取独立页面数据
const useGetPageEffect = () => {
  const store = useStore()

  const GetPage = async () => {
    const { data: res } = await AxiosGetPage()
    if (res.code !== 200) {
      alert('请求异常！')
      return false
    }
    // 将数据存入 vuex
    store.dispatch('page', res)
  }

  GetPage()
}

export default {
  setup () {
    // 初始化vuex
    const store = useStore()

    useGetPageEffect()

    return { store }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Header/Header.less');
</style>
