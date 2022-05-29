import { createStore } from 'vuex'
export default createStore({
  state: {
    config: {
      // 后端 API 地址
      api: '',
      // API 请求token
      token: '',
      // Header logo 图片
      logo: ''

    },
    // 页面配置
    options: {
      code: '',
      data: {
        site: {},
        webmaster: {}
      },
      msg: ''
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
    },
    optionsDataSiteOpt (state) {
      return state.options.data.site.opt
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
    },
    options (state, data) {
      state.options = data
    }
  },
  actions: {
    page (store, data) {
      store.commit('page', data)
    },
    options (store, data) {
      store.commit('options', data)
    }
  },
  modules: {
  }
})
