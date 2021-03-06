import axios from 'axios'
import store from '@/store/index'
import { ElNotification } from 'element-plus'

// 自定义 request 实例
const request = axios.create({
  timeout: 8000
});

// 获取配置文件,并存到 vuex 中
// 设置 request 的默认地址
(async () => {
  const { data } = await axios.get('./config.json')
  store.commit('config', data)
  // 设置实例 request 的 baseURL
  request.defaults.baseURL = data.api
})()

// 请求拦截器
request.interceptors.request.use(value => {
  // 判断请求是否需要填写token
  // 如果 vuex 中的 token 不为空，则每次请求都带上它
  if (store.state.config.token !== '') {
    value.params.token = store.state.config.token
  }

  return value
})

// 响应拦截器
request.interceptors.response.use(response => {
  if (response.data.msg === '禁止非法操作！') {
    ElNotification({
      title: '错误',
      message: 'API 请求错误，请查看 token 是否填写正确',
      type: 'error',
      duration: 0
    })
    return false
  }
  return response
}, error => {
  ElNotification({
    title: '错误',
    message: '请求超时，请查看 API 地址是否填写正确',
    type: 'error',
    duration: 0
  })
  return error
})

export default request
