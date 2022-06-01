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
      <el-button type="primary" class="d-block" @click="login" :loading="ButtonStatus">点击登录</el-button>
      <p class="text mt-4">还没有账号?<span class="ps-2" @click="LoginIsRegisterChange">注册</span></p>
    </div>

    <div v-if="LoginIsRegister" class="register container shadow">
      <span class="back mb-5" @click="goBack"><i class="bi bi-box-arrow-right"></i>返回首页</span>
      <h4 class="title">注册</h4>
      <p class="text m2-5">请填写正确的信息，方便找回密码！</p>
      <el-form label-position="top" label-width="100px" :model="registerInfo" size="large">
        <el-form-item>
          <el-input v-model="registerInfo.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerInfo.password" placeholder="密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerInfo.confirmPassword" placeholder="确认密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerInfo.email" placeholder="电子邮箱" />
        </el-form-item>
        <el-button @click="GetVerifyCode">获取验证码</el-button>
        <el-form-item class="mt-4">
          <el-input v-model="registerInfo.code" placeholder="验证码" />
        </el-form-item>
        <p class="tips mt-3">
          <el-switch v-model="registerInfo.agreement" size="small" class="pe-2" />我同意用户协议
        </p>
      </el-form>
      <el-button type="primary" class="d-block" @click="register" :loading="ButtonStatus">点击注册</el-button>
      <p class="text mt-4">已有账号?<span class="ps-2" @click="LoginIsRegisterChange">登录</span></p>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { RequestPostLogin } from '@/utils/LoginOrRegister/PostLogin'
// 登录相关
const useLoginEffect = (ButtonStatus) => {
  const store = useStore()
  // 登录的信息
  const loginInfo = reactive({
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    password: localStorage.getItem('password') ? localStorage.getItem('password') : '',
    saveLoginInfo: false
  })

  // 登录
  const login = async () => {
    // 更改按钮状态，禁止点击
    ButtonStatus.value = true

    // 判断用户名密码是否为空
    if (loginInfo.username === '' || loginInfo.password === '') {
      ElNotification({
        title: '错误',
        message: '请填写用户名或密码',
        type: 'error',
        duration: 3500
      })
      ButtonStatus.value = false
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
      ButtonStatus.value = false
      return false
    }
    // 将数据转存到 vuex 中
    store.dispatch('LoginInfo', res.data)
    store.dispatch('LoginInfoToken', Object.values(res.data)[0])
    // 判断是否需要记住用户名密码
    if (loginInfo.saveLoginInfo === true) {
      localStorage.setItem('username', loginInfo.username)
      localStorage.setItem('password', loginInfo.password)
    }

    ElNotification({
      title: '成功',
      message: res.msg,
      type: 'success',
      duration: 3500
    })

    ButtonStatus.value = false
  }

  return { login, loginInfo }
}

// 注册相关
const useRegisterEffect = (ButtonStatus) => {
  const registerInfo = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    code: '',
    agreement: false
  })

  // 获取验证码
  const GetVerifyCode = () => {
    if (registerInfo.email === '') {
      ElNotification({
        title: '警告',
        message: '邮箱不能为空',
        type: 'warning',
        duration: 3500
      })
    }
  }
  // 注册
  const register = async () => {
    // 更改按钮状态，禁止点击
    ButtonStatus.value = true

    // 判断用户是否同意协议
    if (registerInfo.agreement === false) {
      ElNotification({
        title: '警告',
        message: '请同意用户协议',
        type: 'warning',
        duration: 3500
      })
      ButtonStatus.value = false
      return false
    }

    ButtonStatus.value = false
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

    // 登录 | 注册 按钮状态
    const ButtonStatus = ref(false)

    // 登录
    const { loginInfo, login } = useLoginEffect(ButtonStatus)
    // 注册
    const { registerInfo, GetVerifyCode, register } = useRegisterEffect(ButtonStatus)

    return {
      goBack,
      ButtonStatus,

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
