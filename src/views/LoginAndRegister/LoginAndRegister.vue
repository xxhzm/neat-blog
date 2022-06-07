<template>
  <div>
    <div v-if="!LoginIsRegister" class="login container shadow">
      <span class="back mb-5" @click="goBack"><i class="bi bi-box-arrow-right"></i>返回首页</span>
      <h4 class="title">登录</h4>
      <p class="text m2-5">请输入账号密码进行登录</p>
      <el-form label-position="top" label-width="100px" :model="loginInfo" size="large">
        <el-form-item>
          <el-input v-model="loginInfo.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginInfo.password" type="password" placeholder="密码" show-password />
        </el-form-item>
        <p class="tips">
          <el-switch v-model="loginInfo.saveLoginInfo" size="small" class="pe-2" />记住密码
        </p>
      </el-form>
      <el-button type="primary" class="d-block" @click="login" :loading="loginOrRegisterButtonStatus">点击登录</el-button>
      <p class="text mt-4">还没有账号?<span class="ps-2" @click="LoginIsRegisterChange">注册</span></p>
    </div>

    <div v-if="LoginIsRegister" class="register container shadow">
      <span class="back mb-5" @click="goBack"><i class="bi bi-box-arrow-right"></i>返回首页</span>
      <h4 class="title">注册</h4>
      <p class="text m2-5">请填写正确的信息，方便找回密码！</p>
      <el-form label-position="top" label-width="100px" :model="registerInfo" size="large">
        <el-form-item>
          <el-input v-model="registerInfo.nickname" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerInfo.password" placeholder="密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerInfo.email" placeholder="电子邮箱" />
        </el-form-item>
        <el-form-item class="mt-4">
          <el-input v-model="registerInfo.code" placeholder="验证码" />
        </el-form-item>
        <el-button @click="GetVerifyCode" :loading="verifyCodeButtonStatus" >获取验证码</el-button>
        <p class="tips mt-3">
          <el-switch v-model="registerInfo.agreement" size="small" class="pe-2" />我同意用户协议
        </p>
      </el-form>
      <el-button type="primary" class="d-block" @click="register" :loading="loginOrRegisterButtonStatus">点击注册</el-button>
      <p class="text mt-4">已有账号?<span class="ps-2" @click="LoginIsRegisterChange">登录</span></p>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { RequestPostLogin } from '@/utils/LoginAndRegister/PostLogin'
import { RequestPostRegister } from '@/utils/LoginAndRegister/PostRegister'
import { RequestPostVerifyCode } from '@/utils/LoginAndRegister/PostVerifyCode'

// 登录相关
const useLoginEffect = (router, loginOrRegisterButtonStatus) => {
  const store = useStore()

  // 登录的信息
  const loginInfo = reactive({
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    password: localStorage.getItem('password') ? localStorage.getItem('password') : '',
    saveLoginInfo: !!localStorage.getItem('password')
  })

  // 登录
  const login = async () => {
    // 更改按钮状态，禁止点击
    loginOrRegisterButtonStatus.value = true

    // 判断用户名密码是否为空
    if (loginInfo.username === '' || loginInfo.password === '') {
      ElNotification({
        title: '错误',
        message: '请填写用户名或密码',
        type: 'error',
        duration: 3500
      })
      loginOrRegisterButtonStatus.value = false
      return false
    }

    // 向服务端发送请求，判断用户名密码是否正常
    const { data: res } = await RequestPostLogin(loginInfo)
    if (res.code !== 200) {
      ElNotification({
        title: '错误',
        message: res.msg,
        type: 'error',
        duration: 3500
      })
      loginOrRegisterButtonStatus.value = false
      return false
    }
    // 将数据转存到 vuex 中
    store.dispatch('LoginInfo', res.data)
    store.dispatch('LoginInfoToken', Object.values(res.data)[0])

    // 判断是否需要记住用户名密码
    if (loginInfo.saveLoginInfo === true) {
      localStorage.setItem('username', loginInfo.username)
      localStorage.setItem('password', loginInfo.password)
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }

    ElNotification({
      title: '成功',
      message: res.msg,
      type: 'success',
      duration: 3500
    })

    loginOrRegisterButtonStatus.value = false

    // 返回上一页
    router.go(-1)
  }

  return { login, loginInfo }
}

// 注册相关
const useRegisterEffect = (router, loginOrRegisterButtonStatus, verifyCodeButtonStatus) => {
  const registerInfo = reactive({
    nickname: '',
    password: '',
    email: '',
    code: '',
    agreement: false
  })

  // 获取验证码
  const GetVerifyCode = async () => {
    if (registerInfo.email === '') {
      ElNotification({
        title: '警告',
        message: '邮箱不能为空',
        type: 'error',
        duration: 3500
      })

      return false
    }

    // 正则表达式验证邮箱是否正确
    if (registerInfo.email.search(/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
      ElNotification({
        title: '警告',
        message: '请确认邮箱格式是否正确',
        type: 'error',
        duration: 3500
      })

      return false
    }
    // 更改验证码状态，禁止用户重复获取验证码
    verifyCodeButtonStatus.value = true

    const { data: res } = await RequestPostVerifyCode(registerInfo.email)
    // 判断接口返回的信息，是否发送成功验证码
    if (res.msg === '验证码已发送至邮箱，5分钟内有效！' || res.msg === '验证码已发送至邮箱5分钟内有效！') {
      ElNotification({
        title: '成功',
        message: res.msg,
        type: 'success',
        duration: 3500
      })

      // 设置 60 秒后可以继续获取验证码
      setTimeout(() => {
        verifyCodeButtonStatus.value = false
      }, 60000)
    } else {
      ElNotification({
        title: '失败',
        message: res.msg,
        type: 'error',
        duration: 3500
      })
    }
  }
  // 注册
  const register = async () => {
    // 更改按钮状态，禁止点击
    loginOrRegisterButtonStatus.value = true

    // if 判断函数 内容 条件 错误弹窗信息
    const ifInfo = (content, condition, msg) => {
      if (content === condition) {
        ElNotification({
          title: '错误',
          message: msg,
          type: 'error',
          duration: 3500
        })

        loginOrRegisterButtonStatus.value = false

        return false
      } else {
        return true
      }
    }

    // 判断 ifInfo 返回的内容是否为 false 如果为 false 则终止执行
    if (
      ifInfo(registerInfo.nickname, '', '请输入用户名') === false ||
      ifInfo(registerInfo.password, '', '请输入密码') === false ||
      ifInfo(registerInfo.email, '', '请输入邮箱') === false ||
      ifInfo(registerInfo.agreement, false, '请同意用户协议') === false ||
      ifInfo(registerInfo.email.search(/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/), -1, '请确认邮箱格式是否正确') === false
    ) {
      return false
    }

    const { data: res } = await RequestPostRegister(registerInfo)
    if (res.msg === 'ok') {
      ElNotification({
        title: '成功',
        message: '注册成功，正在跳转登录',
        type: 'success',
        duration: 3500
      })
      // 刷新页面
      router.go(0)
    } else {
      ElNotification({
        title: '失败',
        message: '注册失败，正在跳转首页',
        type: 'success',
        duration: 3500
      })

      // 返回上一页
      router.go(-1)
    }
  }

  return { registerInfo, GetVerifyCode, register }
}

export default {
  setup () {
    const router = useRouter()

    // 控制是否显示登录 | 注册
    const LoginIsRegister = ref(false)

    // 登录注册显示切换
    const LoginIsRegisterChange = () => {
      LoginIsRegister.value = !LoginIsRegister.value
    }

    // 返回首页
    const goBack = () => {
      router.push('/')
    }

    const verifyCodeButtonStatus = ref(false)
    // 登录 | 注册 按钮状态
    const loginOrRegisterButtonStatus = ref(false)

    // 登录
    const { loginInfo, login } = useLoginEffect(router, loginOrRegisterButtonStatus)

    // 注册
    const { registerInfo, GetVerifyCode, register } = useRegisterEffect(router, loginOrRegisterButtonStatus, verifyCodeButtonStatus)

    return {
      goBack,
      loginOrRegisterButtonStatus,
      verifyCodeButtonStatus,

      LoginIsRegister,
      LoginIsRegisterChange,

      login,
      loginInfo,

      GetVerifyCode,
      registerInfo,
      register
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Login/Login.less');
</style>
