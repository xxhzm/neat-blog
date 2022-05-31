<template>
  <router-view></router-view>
  <el-backtop :right="50" :bottom="50" />
</template>

<script>
import { RequestGetOptions } from '@/utils/Options/GetOptions'
import { useStore } from 'vuex'
// 页面选项请求 + 页面修改
const useDocumentReviseEffect = () => {
  const store = useStore()
  // 修改页面标题，描述,关键词...
  const documentOptions = () => {
    document.title = store.getters.optionsDataSiteOpt.title
    const meta = document.getElementsByTagName('meta')
    meta.keywords.content = store.getters.optionsDataSiteOpt.keywords
    meta.description.content = store.getters.optionsDataSiteOpt.description
  }

  // 读取页面的配置项
  const GetOptions = async () => {
    const { data: res } = await RequestGetOptions()
    store.dispatch('options', res)
    documentOptions()
  }

  setTimeout(() => {
    GetOptions()
  }, 0)
}
export default {
  setup () {
    useDocumentReviseEffect()
  }
}
</script>

<style lang="less">
@import url('@/assets/Less/App.less');
</style>
