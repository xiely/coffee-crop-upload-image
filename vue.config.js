// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      // 这里假设你要代理的接口以 /api 开头
      '/gw': {
        target: 'http://coffee.htcbot.com', // 修改为你的后端接口地址
        changeOrigin: true,
        pathRewrite: {
          '^/gw': '/gw'
        }
      }
    }
  }
};
