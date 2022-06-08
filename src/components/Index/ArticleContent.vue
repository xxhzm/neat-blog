<template>
  <div class="ArticleContent__container shadow">
    <h2 class="ArticleContent__title">
      <router-link :to="/article/ + article.id">{{ article.title }}</router-link>
    </h2>
    <div class="ArticleContent__content">
      <!-- 判断是否有图，来决定显示类名 -->
      <div :class="article.img_src? 'ArticleContent__text ArticleContent__text-tow': 'ArticleContent__text'">
        {{ article.description }}
      </div>
      <img v-if="article.img_src" :src="article.img_src" class="ArticleContent__img">
    </div>
    <div class="ArticleContent__footer">
      <p>发布于<span class="ps-2">{{ article.create_time }}</span></p><i>/</i>
      <p><span>{{ views }}</span>阅读</p><i>/</i>
      <p><span>{{ article.expand.comments.count }}</span>评论</p>
    </div>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue'
export default {
  props: {
    articleData: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { articleData: article } = toRefs(props)

    const views = computed(() => {
      // 阅读量
      if (article.value.views === null) {
        return 0
      } else {
        return article.value.views
      }
    })

    return { article, views }
  }
}
</script>

<style lang="less" scoped>
@import url('@/assets/Less/Index/ArticleContent.less');
</style>
