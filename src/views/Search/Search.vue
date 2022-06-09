<template>
  <div class="Search__container" v-loading="loading">
    <h2 class="Search__title">找到关于 {{ props.value }} 的 {{ SearchData.count }} 条结果</h2>
    <ArticleContent v-for="item in SearchData.data" :key="item.id" :articleData="item"></ArticleContent>
    <el-pagination class="mt-5 shadow pagination" background layout="prev, pager, next" :page-size="5" :total="count" hide-on-single-page :current-page="currentPage" @current-change="ArticlePageChange" />
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { RequestGetSearch } from '@/utils/Search/GetSeatch'
// 加载动画
const loading = ref(true)

// 获取内容
const props = defineProps(['value'])
// 搜索出来的数据的
const SearchData = ref({})
// 搜索出来的总数量
const count = ref(0)

// 发送请求
const GetSearch = async (val, page) => {
  const { data: { data: res } } = await RequestGetSearch(val, page)
  SearchData.value = res
  count.value = res.count

  // 关闭加载动画
  loading.value = false

  // 操作页面回到顶部
  window.scroll({
    top: 0
  })
}

GetSearch(props.value)

// 分页
const currentPage = ref(1)

const ArticlePageChange = val => {
  // 开启加载动画
  loading.value = true

  currentPage.value = val
  // 分页请求
  GetSearch(props.value, val)
}

// 组件复用时请求新的内容
onBeforeRouteUpdate((to, from, next) => {
  GetSearch(to.params.value)
  next()
})

</script>

<style lang="less">
.Search__container{
  width: 100%;
  padding-bottom: 100px;
  .Search__title{
    color: #666;
    line-height: 1.4;
    font-weight: 700;
    font-size: 18px;
  }
  .pagination {
    position: absolute;
    left: 50%;
    transform: translate(-110%);
    background: #fff;
    li {
      background: #fff !important;
    }
    button {
      background: #fff !important;
    }
    .is-active {
      background-color: var(--el-color-primary) !important;
    }
  }
}

@media screen and (max-width: 950px) {
  .tag__container {
    .pagination {
      transform: translate(-50%);
    }
  }
}
</style>
