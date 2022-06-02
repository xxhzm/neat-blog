<template>
  <div class="Footer__container">
    <p class="beian">
      <a href="//beian.miit.gov.cn/" v-if="store.state.config.icp" target="_blank">{{ store.state.config.icp }}</a>
      <a href="//www.beian.gov.cn/" v-if="store.state.config.gongan" target="_blank"><img src="@/assets/images/gongan.png">{{ store.state.config.gongan }}</a>
    </p>
    <p class="copyright">
      Theme <a href="https://github.com/xxhzm/neat-blog" target="_blank">neat</a> by <a href="//www.xxhzm.cn" target="_blank">小小孩子们</a>
    </p>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()

    return {
      store
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Layout/Footer/Footer.less');
</style>
