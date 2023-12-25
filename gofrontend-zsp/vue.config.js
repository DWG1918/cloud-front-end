const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  lintOnSave: false
};

module.exports = {
  devServer: {
    // 自动打开浏览器
    open: true,
    port: 70,
    proxy: {
      // // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: `http://139.196.226.104:8015/api`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}