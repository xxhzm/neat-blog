<template>
  {{ TagId }}
</template>

<script>
import { toRefs } from '@vue/reactivity'
export default {
  props: ['id'],
  setup (props) {
    const { id: TagId } = toRefs(props)

    return {
      TagId
    }
  }
}
</script>

<style lang="less" scoped>

</style>
