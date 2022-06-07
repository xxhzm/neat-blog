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
    // 登录信息
    LoginInfo: {
      token: '',
      'login-token': '',
      user: {}
    },
    // 所有标签
    AllTag: {
      code: '',
      data: {},
      msg: ''
    },
    // 统计的显示状态
    EchartsDisplay: false,
    // 聚合信息
    Group: {
      code: '',
      article: {
        date: [],
        count: []
      },
      comments: {
        date: [],
        count: []
      },
      links: {
        date: [],
        count: []
      },
      tag: {
        date: [],
        count: []
      }
    },
    // 页面的配置项
    Options: {
      code: '',
      data: {},
      msg: ''
    },
    currentPage: 1,
    CommentContent: {
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
    },
    Group (state, data) {
      state.Group = data
    },
    Options (state, data) {
      state.Options = data
    },
    currentPage (state, data) {
      state.currentPage = data
    },
    CommentContent (state, data) {
      state.CommentContent = data
    }
  },
  actions: {
    page (store, data) {
      store.commit('page', data)
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
    },
    Group (store, data) {
      store.commit('Group', data)
    },
    currentPage (store, data) {
      store.commit('currentPage', data)
    },
    CommentContent (store, data) {
      store.commit('CommentContent', data)
    }
  },
  modules: {
  }
})
