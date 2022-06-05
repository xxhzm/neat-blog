<template>
  <div class="Index__container">
    <ArticleContent v-for="item in store.getters.articleData.data" :key="item.id" :articleDate="item" v-loading="loading" ></ArticleContent>
    <el-pagination class="mt-5 shadow pagination" background layout="prev, pager, next" :page-size="5" :total="count" hide-on-single-page @current-change="ArticlePageChange" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { RequestGetArticle } from '@/utils/Article/GetArticle'
import ArticleContent from '@/components/Index/ArticleContent.vue'
import { ref } from 'vue'

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
      loading.value = false
    }

    // 延迟加载分页数量
    const count = ref(5)
    setTimeout(() => {
      count.value = store.state.article.data.count
    }, 500)

    return {
      store,
      loading,
      count,
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
