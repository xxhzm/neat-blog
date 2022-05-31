<template>
  <div class="Main__container">
    <div class="Main__cont">
      <div class="row">
        <div class="col-9">
          <!-- ArticleContent -->
          <ArticleContent v-for="item in store.getters.articleData.data" :key="item.id" :articleDate="item"></ArticleContent>
        </div>
        <div class="col">456</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { RequestGetArticle } from '@/utils/Article/GetArticle'
import ArticleContent from '@/components/layout/ArticleContent.vue'
// 文章相关
const useArticleEffect = () => {
  const store = useStore()

  const GetArticle = async () => {
    const { data: res } = await RequestGetArticle()
    store.state.article = res
  }

  GetArticle()
}
export default {
  setup () {
    const store = useStore()

    useArticleEffect()

    return { store }
  },
  components: {
    ArticleContent
  }
}
</script>

<style lang="less" scoped>
@import url('@/assets/Less/Layout/Main.less');
</style>
