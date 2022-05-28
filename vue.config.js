const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 SourceMap
  productionSourceMap: false,
  // 本地资源加载地址
  publicPath: './'
})
