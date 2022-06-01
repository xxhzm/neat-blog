<template>
  <div class="ArticleContent__container shadow">
    <h2 class="ArticleContent__title">
      <router-link to="">{{ article.title }}</router-link>
    </h2>
    <div class="ArticleContent__content">
      <div class="ArticleContent__text">
        {{ article.description }}
      </div>
      <img v-if="article.img_src" :src="article.img_src" class="ArticleContent__img">
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  props: {
    articleDate: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { articleDate: article } = toRefs(props)
    return { article }
  }
}
</script>

<style lang="less" scoped>
@import url('@/assets/Less/Index/ArticleContent.less');
</style>
