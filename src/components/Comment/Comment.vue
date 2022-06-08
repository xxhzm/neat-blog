<template>
  <div class="Comment__container shadow" ref="MyComment" v-loading="!CommentLoadingShow">
    <h2 class="Comment__title">评论</h2>
    <!-- 评论显示 -->
    <div class="Comment__get__cont mt-3">
      <div class="Comment__get__cont__null" v-if="store.state.CommentContent.data.count === 0">
        <img src="@/assets/images/Comment.png">
        <span>无人评论,快来抢个沙发!</span>
      </div>

      <div class="Comment__get__cont__content" v-else>
        <ul>
          <li v-for="item in store.state.CommentContent.data.data" :key="item.id" class="mt-2">
            <div class="Comment__get__cont__content__left">
              <img :src="headImg(item.email)" alt="">
            </div>
            <div class="Comment__get__cont__content__right">
              <p class="Comment__nickname"><b><a :href="item.url">{{ item.nickname }}</a></b><a class="Comment__reply" @click="CommentReply(item.id)">回复</a></p>
              <p class="Comment__time">{{ item.create_time }}</p>
              <div class="Comment__content" v-html="item.expand.html"></div>
              <!-- 子级评论 -->
              <ul>
                <li v-for="itemSon in item.son" :key="itemSon.id" class="mt-2">
                  <div class="Comment__get__cont__content__left">
                    <img :src="headImg(itemSon.email)" alt="">
                  </div>
                  <div class="Comment__get__cont__content__right">
                    <p class="Comment__nickname"><b><a :href="itemSon.url">{{ itemSon.nickname }}</a></b><a class="Comment__reply" @click="CommentReply(item.id)">回复</a></p>
                    <p class="Comment__time">{{ itemSon.create_time }}</p>
                    <div class="Comment__content" v-html="itemSon.expand.html"></div>
                  </div>
                </li>
              </ul>
              <!-- 子级评论 -->
            </div>
          </li>
        </ul>
      </div>

    </div>
    <!-- 发送评论 -->
    <div class="row g-3 mt-5 pt-3 Comment__send__cont">
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
        <textarea class="form-control p-2" rows="4" placeholder="说点什么吧..." v-model.lazy.trim="commentInfo.content" ref="textarea"></textarea>
      </div>
      <div class="col-md-12 mt-4">
        <p class="Comment__cancel__reply float-start" v-if="commentInfo.pid !== ''" @click="CommentCancelReply">取消回复</p>
        <el-button class="float-end" type="primary" @click="commentSubmit" :loading="commentSubmitButtonStatus">发表评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, nextTick, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { RequestPostComment } from '@/utils/Comment/PostComment'
import { RequestGetComment } from '@/utils/Comment/GetComment'

// 发送评论
const useSendCommentEffect = (store, Id) => {
  // 按钮状态
  const commentSubmitButtonStatus = ref(false)

  const commentInfo = reactive({
    nickname: '',
    email: '',
    url: '',
    content: '',
    pid: '',
    article_id: Id.value
  })

  // 文本框
  const textarea = ref(null)
  // 评论回复，修改 pid
  const CommentReply = (id) => {
    commentInfo.pid = id

    // 给文本框设置焦点
    nextTick(() => {
      textarea.value.focus()
    })
  }

  // 取消回复
  const CommentCancelReply = () => {
    commentInfo.pid = ''
  }

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
      commentSubmitButtonStatus.value = true

      const data = new URLSearchParams()
      data.append('login-token', store.state.LoginInfo.token)
      data.append('nickname', commentInfo.nickname)
      data.append('email', commentInfo.email)
      data.append('url', commentInfo.url)
      data.append('content', commentInfo.content)
      data.append('article_id', Id.value)
      // 如果没有评论的父级ID 那就不添加他
      if (commentInfo.pid !== '') {
        data.append('pid', commentInfo.pid)
      }

      const { data: res } = await RequestPostComment(data)
      if (res.code !== 200) {
        ElNotification({
          title: '警告',
          message: res.msg,
          type: 'error',
          duration: 3500
        })

        commentSubmitButtonStatus.value = false

        return false
      }

      // 评论成功后执行的
      ElNotification({
        title: '成功',
        message: '评论成功',
        type: 'success',
        duration: 3500
      })

      commentSubmitButtonStatus.value = false

      // 获取最新评论
      useGetCommentEffect(store, Id)

      // 清空表单
      commentInfo.nickname = ''
      commentInfo.email = ''
      commentInfo.content = ''
      commentInfo.url = ''
    }

    PostComment()
  }

  return {
    commentSubmitButtonStatus,
    commentInfo,
    commentSubmit,
    CommentReply,
    CommentCancelReply,
    textarea
  }
}

// 获取评论
const useGetCommentEffect = async (store, Id, CommentLoadingShow) => {
  const { data: res } = await RequestGetComment(Id.value)

  store.dispatch('CommentContent', res)

  // 修改盒子的状态
  if (CommentLoadingShow !== undefined) {
    CommentLoadingShow.value = true
  }
}

// 评论盒子的加载状态
const useCommentStatusEffect = (store, Id) => {
  // 评论是否加载过
  const CommentLoading = ref(false)

  const MyComment = ref(null)

  // 是否现在加载动画
  const CommentLoadingShow = ref(false)

  onMounted(() => {
    // 页面滚动到距离评论盒子 1000px 的地方进行加载所有的评论
    // 节流
    window.onscroll = throttle(function () {
      // 判断评论是否加载过，如果没有就进行加载，如果有就终止
      if (CommentLoading.value === true) {
        return false
      }

      if (MyComment.value.offsetTop - document.documentElement.scrollTop < 1000) {
        // 设置评论加载 为 true
        CommentLoading.value = true

        useGetCommentEffect(store, Id, CommentLoadingShow)
      }
    })

    function throttle (cd, time = 300) {
      let t = null
      return function () {
        if (t) return
        t = setTimeout(() => {
          cd.call(this)
          t = null
        }, time)
      }
    }
  })

  // 评论头像显示
  const headImg = (email) => {
    // 如果是 QQ 邮箱，那就自动获取请求头像
    if (email.indexOf('qq.com') !== -1) {
      return '//q2.qlogo.cn/g?b=qq&s=100&nk=' + email
    }
    return 'https://sdn.geekzu.org/avatar/'
  }
  return {
    MyComment,
    CommentLoadingShow,
    headImg
  }
}

export default {
  props: ['id'],
  setup (props) {
    const store = useStore()

    const { id: Id } = toRefs(props)

    const { commentSubmitButtonStatus, commentInfo, commentSubmit, CommentReply, CommentCancelReply, textarea } = useSendCommentEffect(store, Id)

    const { MyComment, CommentLoadingShow, headImg } = useCommentStatusEffect(store, Id)

    // 组件销毁时清空评论的内容
    onUnmounted(() => {
      store.dispatch('CommentContent', {
        code: '',
        data: {},
        msg: ''
      })
    })

    return {
      store,

      commentSubmitButtonStatus,
      commentInfo,
      commentSubmit,
      CommentReply,
      CommentCancelReply,
      textarea,

      MyComment,
      CommentLoadingShow,

      headImg
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Article/Comment.less');
</style>
