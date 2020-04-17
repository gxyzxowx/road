/*
 * @Date         : 2019-12-11 16:50:10
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-04-14 10:56:47
 * @FilePath     : \road\src\store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemInfo: {
      id: '',
      des: ''
    },
    selectItemID: '',
    // 关闭新建/修改的modal状态量true/false
    modalState: ''
  },
  mutations: {
    // 下拉框选择项目时
    setItem (state, obj) {
      state.itemInfo = obj
    },
    // 可以是管理模块里面的项目ID，用户ID，设备ID，材料ID
    selectItemID (state, value) {
      state.selectItemID = value
    },
    // 关闭新建/修改的Modal
    setModalState (state, value) {
      state.modalState = value
    }
  },
  // 所有的异步操作，和整合一个或多个mutations
  actions: {

  }
})
