module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://49.234.69.205/index.php/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
