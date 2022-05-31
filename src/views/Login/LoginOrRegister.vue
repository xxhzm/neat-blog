<template>
  <div>
    <div v-if="!LoginIsRegister" class="login container shadow">
      <h4 class="title">登陆</h4>
      <p class="text mb-5">请输入账号密码进行登陆</p>
      <el-form label-position="top" label-width="100px" :model="loginInfo">
        <el-form-item label="用户名：">
          <el-input v-model="loginInfo.username" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="loginInfo.password" type="password"/>
        </el-form-item>
        <p class="tips" @click="LoginIsRegisterChange">注册账号</p>
      </el-form>
      <el-button type="primary" class="d-block" @click="login">登陆</el-button>
    </div>

    <div v-if="LoginIsRegister" class="register container shadow">
      <h4 class="title">注册</h4>
      <p class="text mb-5">请填写正确的信息，方便找回密码！</p>
      <el-form label-position="top" label-width="100px" :model="registerInfo">
        <el-form-item label="用户名：">
          <el-input v-model="registerInfo.username" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="registerInfo.password" />
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="registerInfo.confirmPassword" />
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="registerInfo.email" />
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input v-model="registerInfo.code" />
        </el-form-item>
        <el-button type="info">获取验证码</el-button>
        <p class="tips mt-2" @click="LoginIsRegisterChange">前往登录</p>
      </el-form>
      <el-button type="primary" class="d-block">注册</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { RequestPostLogin } from '@/utils/LoginOrRegister/PostLogin'
// 登录
const useLoginEffect = () => {
  const store = useStore()
  // 登录的信息
  const loginInfo = reactive({
    username: '',
    password: ''
  })

  // 发送请求
  const login = async () => {
    const { data: res } = await RequestPostLogin(loginInfo)
    if (res.code !== 200) {
      ElNotification({
        title: '错误',
        message: res.msg,
        type: 'error',
        duration: 3500
      })
      return false
    }
    // 将数据转存到 vuex 中
    store.state.loginInfo = res.data

    ElNotification({
      title: '成功',
      message: res.msg,
      type: 'success',
      duration: 3500
    })
  }

  return {
    login,
    loginInfo
  }
}
const useRegisterEffect = () => {
  const registerInfo = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    code: ''
  })

  return {
    registerInfo
  }
}
export default {
  setup () {
    // 控制是否显示登录 | 注册
    const LoginIsRegister = ref(false)

    const LoginIsRegisterChange = () => {
      LoginIsRegister.value = !LoginIsRegister.value
    }

    // 登录
    const { loginInfo, login } = useLoginEffect()
    // 注册
    const { registerInfo } = useRegisterEffect()

    return {
      LoginIsRegister,
      LoginIsRegisterChange,
      login,
      loginInfo,
      registerInfo
    }
  }
}

</script>

<style lang="less" scoped>
@import url('@/assets/Less/Login/Login.less');
</style>
