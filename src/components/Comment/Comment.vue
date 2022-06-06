<template>
  <div class="Comment__container shadow">
    <h2 class="Comment__title">评论</h2>
    <div class="row g-3 mt-3 Comment__cont">
      <div class="col-md-4" v-if="store.state.LoginInfo.token === ''">
        <input type="text" class="form-control p-2" placeholder="名称" v-model.lazy.trim="commentInfo.nickname">
      </div>
      <div class="col-md-4" v-if="store.state.LoginInfo.token === ''">
        <input type="email" class="form-control p-2" placeholder="电子邮箱" v-model.lazy.trim="commentInfo.email">
      </div>
      <div class="col-md-4" v-if="store.state.LoginInfo.token === ''">
        <input type="text" class="form-control p-2" placeholder="网址或博客" v-model.lazy.trim="commentInfo.url">
      </div>
      <div class="col-md-12">
        <textarea class="form-control p-2" rows="4" placeholder="说点什么吧..." v-model.lazy.trim="commentInfo.content"></textarea>
      </div>
      <div class="col-md-12 mt-4">
        <el-button class="float-end" type="primary" @click="commentSubmit">发表评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { RequestPostComment } from '@/utils/Comment/PostComment'

export default {
  props: ['id'],
  setup (props) {
    const store = useStore()

    const { id: Id } = toRefs(props)

    const commentInfo = reactive({
      nickname: '',
      email: '',
      url: '',
      content: '',
      pid: '',
      article_id: Id.value
    })

    // 判断是否符合规则
    const commentSubmit = () => {
      // 如果 vuex 中没有 token 则进行判断用户是否填写了昵称，邮箱
      if (store.state.LoginInfo.token === '') {
        if (commentInfo.nickname === '' || commentInfo.email === '' || commentInfo.email.search(/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
          ElNotification({
            title: '警告',
            message: '表单填写错误！',
            type: 'error',
            duration: 3500
          })

          return false
        }
      }
      // 判断用户是否填写了内容
      if (commentInfo.content === '') {
        ElNotification({
          title: '警告',
          message: '内容禁止为空',
          type: 'error',
          duration: 3500
        })

        return false
      }

      // 发送请求
      const PostComment = async () => {
        const data = new URLSearchParams()
        data.append('login-token', store.state.LoginInfo.token)
        data.append('nickname', commentInfo.nickname)
        data.append('email', commentInfo.email)
        data.append('content', commentInfo.content)

        const { data: res } = await RequestPostComment(data)
        if (res.code !== 200) {
          ElNotification({
            title: '警告',
            message: res.msg,
            type: 'error',
            duration: 3500
          })
        }
      }

      PostComment()
    }

    return {
      store,
      commentInfo,
      commentSubmit
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Article/Comment.less');
</style>
