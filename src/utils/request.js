import axios from 'axios'
import store from '@/store/index'

// 获取配置文件,并存到 vuex 中
// 设置 axios 的默认地址
(async () => {
  const { data } = await axios.get('./config.json')
  store.commit('config', data)
  axios.defaults.baseURL = data.api
})()
