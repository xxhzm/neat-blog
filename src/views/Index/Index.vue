<template>
  <div class="Index__container">
    <ArticleContent v-for="item in store.getters.articleData.data" :key="item.id" :articleDate="item" v-loading="loading" ></ArticleContent>
    <el-pagination class="mt-5 shadow pagination" background layout="prev, pager, next" :page-size="5" :total="count" hide-on-single-page :current-page="currentPage" @current-change="ArticlePageChange" />
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { RequestGetArticle } from '@/utils/Article/GetArticle'
import ArticleContent from '@/components/Index/ArticleContent.vue'

// 文章相关
const useArticleEffect = () => {
  const store = useStore()
  // 获取
  const GetArticle = async () => {
    const { data: res } = await RequestGetArticle(1)
    store.dispatch('article', res)
  }

  GetArticle()
}

export default {
  setup () {
    const store = useStore()
    const loading = ref(false)

    // 当前页数
    const currentPage = ref(store.state.currentPage)

    // 判断 vuex 中文章内容是否为空
    // 如果为空，则调用 API 获取文章
    if (store.state.article.code === '') {
      useArticleEffect()
    }

    // 分页加载
    const ArticlePageChange = async (val) => {
      loading.value = true
      // 操作页面回到顶部
      window.scroll({
        top: 0
      })

      const { data: res } = await RequestGetArticle(val)
      store.dispatch('article', res)
      // 关闭 loading 动画
      loading.value = false

      // 修改当前显示的页数
      currentPage.value = val
    }

    // 等待请求完毕后加载分页数量
    const count = ref(5)
    setTimeout(() => {
      count.value = store.state.article.data.count
    }, 500)

    // 在 onUnmounted 中将当前显示的一页存入 vuex
    onUnmounted (() => {
      store.dispatch('currentPage', currentPage.value)
    })

    return {
      store,
      loading,
      count,
      currentPage,
      ArticlePageChange
    }
  },
  components: {
    ArticleContent
  }
}
</script>

<style lang="less">
@import url('@/assets/Less/Index/Index.less');
</style>
