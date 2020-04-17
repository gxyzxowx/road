/*
 * @Date         : 2019-12-11 16:50:10
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-04-17 11:14:02
 * @FilePath     : \road\src\assets\js\comfun.js
 */
import QS from 'qs'
import axios from 'axios'
// import vm from './main.js'

// import VueAxios from 'vue-axios'

// 开发环境
const BASE_URL = '/api'

// 生产环境
// const BASE_URL = 'http://test.weirong100.com/index.php/api'
// const BASE_URL = 'http://49.234.69.205/index.php/api'
const obj = {
  // 用于取得cookie中的用户名
  getCookie (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return ''
  },
  // 设置cookie，过期时间N天
  setCookie (cname, value, day) {
    var exp = new Date()
    // 测试：1小时过期
    // exp.setTime(exp.getTime() + 60 * 60 * 1000)
    exp.setDate(exp.getDate() + day)
    document.cookie = cname + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },
  // 删除cookie
  delectCookie (cname) {
    this.setCookie(cname, 1, -1)
  },
  // 封装axios
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(BASE_URL + url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  post (url, params, that) {
    that.loading = true
    return new Promise((resolve, reject) => {
      axios.post(BASE_URL + url, QS.stringify(params))
        .then(res => {
          that.loading = false
          resolve(res.data)
        })
        .catch(err => {
          that.loading = false
          reject(err.data)
        })
    })
  }

}

export default obj
