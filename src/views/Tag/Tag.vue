<template>
  <div class="tag__container" v-loading="loading">
    <h2 class="tag__title" v-if="TagData.count === 0">标签 {{ TagName }} 下暂无文章</h2>
    <h2 class="tag__title" v-else>标签 {{ TagName }} 下的文章</h2>
    <ArticleContent v-for="item in TagData.data" :key="item.id" :articleData="item"></ArticleContent>
    <el-pagination class="mt-5 shadow pagination" background layout="prev, pager, next" :page-size="5" :total="count" hide-on-single-page :current-page="currentPage" @current-change="ArticlePageChange" />
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { RequestGetTag } from '@/utils/Tag/GetTag'
import ArticleContent from '@/components/Index/ArticleContent.vue'

export default {
  props: ['id'],
  setup (props) {
    const { id: TagId } = toRefs(props)

    const loading = ref(true)

    const TagData = ref({})

    const TagName = ref('')

    const count = ref(0)

    const GetTag = async (id, page) => {
      const { data: res } = await RequestGetTag(id, page)
      TagData.value = res.data.expand
      TagName.value = res.data.name
      count.value = res.data.expand.count

      loading.value = false
    }

    GetTag(TagId.value)

    // 组件复用时，获取新的内容
    onBeforeRouteUpdate((to, from, next) => {
      loading.value = true

      GetTag(to.params.id)
      next()
    })
    // 当前页数
    const currentPage = ref(TagData.value.count)

    // 分页加载
    const ArticlePageChange = async (val) => {
      loading.value = true

      GetTag(TagId.value, val)

      // 操作页面回到顶部
      window.scroll({
        top: 0
      })
    }

    return {
      TagId,
      TagData,
      TagName,
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
.tag__container{
  width: 100%;
  padding-bottom: 100px;
  .tag__title{
    font-size: 16px;
    font-weight: 700;
    color: #444;
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
