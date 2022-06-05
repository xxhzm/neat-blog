<template>
  <div class="Article__container shadow" v-loading="loading">
    <h2 class="Article__title">{{ ArticleData.title }}</h2>
    <div class="Article__info">
      <p>发布于<span class="ps-2">{{ ArticleData.create_time }}</span></p><i>/</i>
      <p><span>{{ views }}</span>阅读</p><i>/</i>
      <p><span>{{ ArticleData.expand.comments.count }}</span>评论</p>
    </div>
    <div class="Article-content" v-html="ArticleData.content"></div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { RequestGetArticle } from '@/utils/Article/GetArticle'

export default {
  props: ['id'],
  setup (props) {
    // 加载样式
    const loading = ref(true)

    // 文章数据
    const ArticleData = ref({
      expand: {
        comments: {}
      }
    })

    // 请求 API
    const GetArticle = async () => {
      const { data: { data: res } } = await RequestGetArticle(1, props.id)
      ArticleData.value = res

      loading.value = false
    }

    GetArticle()

    const views = computed(() => {
      // 阅读量
      if (ArticleData.value.views === null) {
        return 0
      } else {
        return ArticleData.value.views
      }
    })

    return {
      loading,
      ArticleData,
      views
    }
  }

}
</script>

<style lang="less">
@import url('@/assets/Less/Article/Article.less');
</style>
