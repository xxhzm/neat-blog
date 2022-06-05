<template>
  <router-view></router-view>
  <el-backtop :right="50" :bottom="50" />
</template>

<script>
import { useStore } from 'vuex'
import { RequestGetOptions } from '@/utils/Options/GetOptions'
import { documentUpdate } from '@/utils/DocumentUpdate/DocumentUpdate'

// 页面选项请求 + 页面修改
const useDocumentReviseEffect = (store) => {
  // 读取页面的配置项
  const GetOptions = async () => {
    const { data: { data: res } } = await RequestGetOptions()

    // 将数据转为 JSON 存到 localStorage
    // 并修改页面的内容
    const result = JSON.stringify(res)

    localStorage.setItem('options', result)

    documentUpdate(res.site.opt.title, res.site.opt.description, res.site.opt.keywords)

    store.commit('Options', res)
  }

  if (localStorage.getItem('options') === '') {
    GetOptions()
  } else {
    const options = JSON.parse(localStorage.getItem('options'))

    documentUpdate(options.site.opt.title, options.site.opt.description, options.site.opt.keywords)

    store.commit('Options', options)
  }
}
export default {
  setup () {
    const store = useStore()

    setTimeout(() => {
      useDocumentReviseEffect(store)
    }, 500)
  }
}
</script>

<style lang="less">
@import url('@/assets/Less/App.less');
</style>
