const { defineConfig } = require('@vue/cli-service')
// 按需导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 SourceMap
  productionSourceMap: false,
  // 资源加载地址
  publicPath: './',
  assetsDir: 'assets',
  // 按需导入的插件
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
