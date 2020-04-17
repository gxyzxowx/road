/*
 * @Date         : 2019-12-11 16:50:10
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-04-17 11:14:18
 * @FilePath     : \road\vue.config.js
 */
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://49.234.69.205/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
