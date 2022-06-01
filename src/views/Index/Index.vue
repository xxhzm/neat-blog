<template>
  <ArticleContent v-for="item in store.getters.articleData.data" :key="item.id" :articleDate="item"></ArticleContent>
  <el-pagination class="mt-5" background layout="prev, pager, next" :page-size="5" :total="count" hide-on-single-page @current-change="ArticlePageChange" />

</template>

<script>
import { useStore } from 'vuex'
import { RequestGetArticle } from '@/utils/Article/GetArticle'
import ArticleContent from '@/components/Index/ArticleContent.vue'
import { ref } from 'vue'

// 文章相关
const useArticleEffect = () => {
  const store = useStore()

  const GetArticle = async () => {
    const { data: res } = await RequestGetArticle()
    store.dispatch('article', res)
  }

  GetArticle()
}

export default {
  setup () {
    const store = useStore()

    // 判断 vuex 中文章内容是否为空
    // 如果为空，则调用 API 获取文章
    if (store.state.article.code === '') {
      useArticleEffect()
    }

    // 分页加载
    const ArticlePageChange = async (val) => {
      const { data: res } = await RequestGetArticle(val)
      store.dispatch('article', res)
    }

    // 延迟加载分页数量
    const count = ref(5)
    setTimeout(() => {
      count.value = store.state.article.data.count
    }, 500)

    return {
      store,
      count,
      ArticlePageChange
    }
  },
  components: {
    ArticleContent
  }
}
</script>
