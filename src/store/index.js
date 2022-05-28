import { createStore } from 'vuex'

export default createStore({
  state: {
    config: {
      // 后端 API 地址
      api: '',
      // Header logo 图片
      logo: ''
    },
    // 独立页面的数据
    page: {
      code: '',
      data: {},
      msg: ''
    }
  },
  getters: {
    logo (state) {
      return state.config.logo
    },
    page (state) {
      return state.page.data.data
    }
  },
  mutations: {
    // 配置文件
    config (state, data) {
      state.config = data
    },
    // 独立页面
    page (state, data) {
      state.page = data
    }
  },
  actions: {
    page (store, data) {
      store.commit('page', data)
    }
  },
  modules: {
  }
})
