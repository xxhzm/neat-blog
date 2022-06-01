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
    },
    // 文章相关的数据
    article: {
      code: '',
      data: {},
      msg: ''
    },
    LoginInfo: {
      token: '',
      'login-token': '',
      user: {}
    },
    AllTag: {
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
    },
    articleData (state) {
      return state.article.data
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
    },
    article (state, data) {
      state.article = data
    },
    LoginInfo (state, data) {
      state.LoginInfo = data
    },
    LoginInfoToken (state, data) {
      state.LoginInfo.token = data
    },
    logout (state) {
      state.LoginInfo = {
        token: '',
        'login-token': '',
        user: {}
      }
    },
    AllTag (state, data) {
      state.AllTag = data
    }
  },
  actions: {
    page (store, data) {
      store.commit('page', data)
    },
    options (store, data) {
      store.commit('options', data)
    },
    article (store, data) {
      store.commit('article', data)
    },
    LoginInfo (store, data) {
      store.commit('LoginInfo', data)
    },
    LoginInfoToken (store, data) {
      store.commit('LoginInfoToken', data)
    },
    AllTag (store, data) {
      store.commit('AllTag', data)
    }
  },
  modules: {
  }
})
