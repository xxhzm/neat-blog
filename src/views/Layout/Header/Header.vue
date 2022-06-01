<template>
  <div class="Header__container shadow-sm">
    <div class="Header__cont">
      <div class="Header__top">
        <a href="https://www.xxhzm.cn" class="Header__logo"><img :src="store.getters.logo"></a>
        <div class="Header__search">
          <input type="text" placeholder="请输入搜索内容..." @keyup.enter="search">
          <i class="bi bi-search" @click="search"></i>
        </div>
      </div>
      <div class="Header__bottom">
        <ul class="Header__bottom__left">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li v-for="item in store.getters.page" :key="item.id">
            <router-link to="">{{ item.title }}</router-link>
          </li>
        </ul>
        <div class="Header__bottom__right">
          <div class="d-inline me-3">
            <el-switch v-model="value" active-color="#f3f4f6" inactive-color="#6c757d" />
          </div>

          <el-button><img src="@/assets/images/statistics.png" alt="">统计</el-button>

          <router-link to="/login" class="d-inline ms-3">
            <el-button><img src="@/assets/images/login.png" alt="">登陆</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { RequestGetPage } from '@/utils/Page/GetPage'

// 发送 ajax 获取独立页面数据
const useGetPageEffect = () => {
  const store = useStore()

  const GetPage = async () => {
    const { data: res } = await RequestGetPage()
    // 将数据存入 vuex
    store.dispatch('page', res)
  }

  GetPage()
}

export default {
  setup () {
    // 初始化vuex
    const store = useStore()

    // 判断 vuex 中页面是否为空
    // 如果为空，则调用 API 获取页面
    if (store.state.page.code === '') {
      useGetPageEffect()
    }

    const search = () => {
      console.log('search')
    }

    const value = ref(false)

    return {
      store,
      value,
      search
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Header/Header.less');
</style>
