module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://test.weirong100.com/index.php/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
