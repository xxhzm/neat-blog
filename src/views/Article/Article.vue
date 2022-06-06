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
  <Comment :id="articleId"></Comment>
</template>

<script>
import { ref, computed, toRefs } from 'vue'
import Comment from '@/components/Comment/Comment.vue'
import { RequestGetArticle } from '@/utils/Article/GetArticle'
import { documentUpdate } from '@/utils/DocumentUpdate/DocumentUpdate'

// 文章相关
const useArticleEffect = (id) => {
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
    const { data: { data: res } } = await RequestGetArticle(1, id)
    ArticleData.value = res

    loading.value = false

    if (res.expand.tag === '') {
      documentUpdate(res.title, res.description, '')
      return false
    }

    // 循环遍历数组，拼接字符串
    const name = res.expand.tag.map((item) => {
      return item.name
    })

    const keywords = name.join(',')

    documentUpdate(res.title, res.description, keywords)
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

  return { loading, ArticleData, views }
}
export default {
  props: ['id'],
  setup (props) {
    const { id: articleId } = toRefs(props)

    const { loading, ArticleData, views } = useArticleEffect(articleId.value)

    return {
      loading,
      ArticleData,
      views,
      articleId
    }
  },
  components: {
    Comment
  }

}
</script>

<style lang="less">
@import url('@/assets/Less/Article/Article.less');
</style>
