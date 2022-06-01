<template>
  <div class="AllTag__container shadow" v-if="store.state.AllTag.data.count > 10">
    <h4 class="AllTag__title">标签云</h4>
    <div>
      <router-link v-for="item in store.state.AllTag.data.data" :key="item" :to="/tag/+item.id">
        <el-tag>
          {{ item.name }}
        </el-tag>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { RequestGetAllTag } from '@/utils/Tag/GetAllTag'
export default {
  setup () {
    const store = useStore()

    // 加载最新的评论
    const GetAllTag = async () => {
      const { data: res } = await RequestGetAllTag()
      store.dispatch('AllTag', res)
    }

    // 判断 vuex 中标签是否为空
    // 如果为空，则调用 API 获取标签
    if (store.state.AllTag.code === '') {
      GetAllTag()
    }

    return {
      store
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Sidebay/AllTag.less');
</style>
