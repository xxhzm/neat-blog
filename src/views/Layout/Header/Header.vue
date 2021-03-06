<template>
  <div class="Header__container shadow-sm">
    <div class="Header__cont">
      <div class="Header__top">
        <a href="/" class="Header__logo"><img :src="store.getters.logo"></a>
        <div class="Header__search">
          <input type="text" placeholder="请输入搜索内容..." @keyup.enter="search" v-model="searchValue">
          <i class="bi bi-search" @click="search"></i>
        </div>
      </div>
      <div class="Header__bottom">
        <ul class="Header__bottom__left">
          <li>
            <router-link to="/">首页</router-link>
          </li>

          <li v-for="item in store.getters.page" :key="item.id">
            <router-link v-if="item.alias == 'links'" to="/links" >{{ item.title }}</router-link>
            <router-link v-else-if="item.alias == 'msgwall'" to="/msgwall" >{{ item.title }}</router-link>
            <router-link v-else :to="'/page/'+ item.alias">{{ item.title }}</router-link>
          </li>

        </ul>
        <div class="Header__bottom__right">
          <el-button @click="ShowOrHideEcharts" class="echartsButton"><img src="@/assets/images/statistics.png">统计</el-button>
          <!-- 统计信息 -->
          <div class="shadow" id="group-info" v-if="store.state.EchartsDisplay">
            <div class="chart">
              <h3>文章统计图</h3>
              <div id="article" class="dom" v-if="store.state.EchartsDisplay"></div>
            </div>
            <div class="chart">
              <h3>评论统计图</h3>
              <div id="comments" class="dom" v-if="store.state.EchartsDisplay"></div>
            </div>
            <div class="chart">
              <h3>友链统计图</h3>
              <div id="links" class="dom" v-if="store.state.EchartsDisplay"></div>
            </div>
            <div class="chart">
              <h3>标签统计图</h3>
              <div id="tag" class="dom" v-if="store.state.EchartsDisplay"></div>
            </div>
          </div>

          <router-link to="/login" class="d-inline ms-3" v-if="store.state.LoginInfo.token === ''">
            <el-button><img src="@/assets/images/login.png" alt="">登陆</el-button>
          </router-link>
          <el-button v-else @click="logout"><img src="@/assets/images/login.png" alt="">退出登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { RequestGetAllPage } from '@/utils/Page/GetAllPage'
import { RequestGetGrpup } from '@/utils/Group/GetGroup'
// Echarts
import * as echarts from 'echarts'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 请求独立页面数据
const useGetPageEffect = async (store) => {
  const { data: res } = await RequestGetAllPage()
  // 将数据存入 vuex
  store.dispatch('page', res)
}

// 请求聚和数据
const useGetGroupEffect = async (store) => {
  // 多层解构data
  const { data: { data: res } } = await RequestGetGrpup()

  const result = {
    code: '200',
    article: {
      date: [],
      count: []
    },
    comments: {
      date: [],
      count: []
    },
    links: {
      date: [],
      count: []
    },
    tag: {
      date: [],
      count: []
    }
  }

  // 循环算法，将时间跟数量分别 push 到不同的数组
  const ArrPush = (loopArr, res) => {
    // 要循环的数组,最后要 push 的那个对象
    loopArr.forEach(item => {
      res.date.push(item[0])
      res.count.push(item[1])
    })
  }

  ArrPush(res.article, result.article)
  ArrPush(res.comments, result.comments)
  ArrPush(res.links, result.links)
  ArrPush(res.tag, result.tag)

  store.dispatch('Group', result)
}

// echarts 相关
const useEchartsEffect = (store) => {
  // 统计 div 是否显示
  const EchartsDisplay = ref(false)

  // 统计 div 显示
  const ShowOrHideEcharts = () => {
    // 判断是否显示 DOM 元素
    if (store.state.EchartsDisplay === true) {
      store.state.EchartsDisplay = false
      return false
    }

    // 显示 DOM 元素
    store.state.EchartsDisplay = true
    // 初始化
    echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

    // 图表函数
    const chart = (dom, date, count) => {
      // DOM 元素, 时间, 数量
      const Chart = echarts.init(document.getElementById(dom))

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: date
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: count,
            type: 'line',
            smooth: true
          }
        ]
      }

      option && Chart.setOption(option)
    }

    nextTick(() => {
      chart('article', store.state.Group.article.date, store.state.Group.article.count)
      chart('comments', store.state.Group.comments.date, store.state.Group.comments.count)
      chart('links', store.state.Group.links.date, store.state.Group.links.count)
      chart('tag', store.state.Group.tag.date, store.state.Group.tag.count)
    })
  }

  return {
    EchartsDisplay,
    ShowOrHideEcharts
  }
}

export default {
  setup () {
    // 初始化 vuex
    const store = useStore()
    // 初始化 router
    const router = useRouter()

    // 判断 vuex 中页面是否为空
    // 如果为空，则调用 API 获取页面
    if (store.state.page.code === '') {
      useGetPageEffect(store)
    }

    if (store.state.Group.code === '') {
      useGetGroupEffect(store)
    }

    // 搜索
    const searchValue = ref('')

    const search = () => {
      router.push({ name: 'Search', params: { value: searchValue.value } })
      searchValue.value = ''
    }

    // 退出登录
    const logout = () => {
      store.commit('logout')
    }

    const { EchartsDisplay, ShowOrHideEcharts } = useEchartsEffect(store)

    // 组件销毁时，关闭统计 DOM 元素显示
    onUnmounted(() => {
      store.state.EchartsDisplay = false
    })

    return {
      store,
      EchartsDisplay,
      ShowOrHideEcharts,
      search,
      searchValue,
      logout
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Layout/Header/Header.less');
</style>
