<template>
  <div class="Header__container shadow-sm">
    <div class="Header__cont">
      <div class="row">
        <!-- 导航栏 -->
        <div class="col-9 Header__nav">
          <!-- 左侧LOGO -->
          <a href="https://www.xxhzm.cn" class="Header__logo"><img :src="store.getters.logo"></a>
          <ul class="">
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li v-for="item in store.getters.page" :key="item.id">
              <router-link to="">{{ item.title }}</router-link>
            </li>
          </ul>
          <div class="Header__search">
            <input type="text" placeholder="请输入搜索内容..." @keyup.enter="search">
            <i class="bi bi-search" @click="search"></i>
          </div>
        </div>
        <!-- 右侧功能页 -->
        <div class="col Header__right">
          <ul>
            <li>
              <router-link to="">
                <img src="@/assets/images/login.png" alt="">
                登录
              </router-link>
            </li>
            <li>
              <router-link to="">
                <img src="@/assets/images/register.png" alt="">
                注册
              </router-link>
            </li>
            <li>
              <router-link to="">
                <img src="@/assets/images/announcement.png" alt="">
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    useGetPageEffect()

    const search = () => {
      console.log('search')
    }

    return {
      store,
      search
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Header/Header.less');
</style>
