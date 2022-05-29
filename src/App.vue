<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { RequestGetOptions } from '@/utils/Options/GetOptions'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    // 页面标题，描述,关键词...修改
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

    return { store }
  }
}
</script>

<style lang="less">
@import url('@/assets/Less/App.less');
</style>
