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
    equipUseItemID: '',
    klUse: {
      bd: '',
      itemID: '',
      mKlID: ''
    },
    // 关闭新建/修改的modal状态量true/false
    modalState: '',
    modalStateKl: ''
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
    // 设备管理修改设备时专用
    equipUseItemID (state, value) {
      state.equipUseItemID = value
    },
    // 新建、修改矿料时用的项目,标段，矿料
    setKlUse (state, obj) {
      state.klUse = obj
    },
    // 关闭新建/修改的Modal
    setModalState (state, value) {
      state.modalState = value
    },
    // 关闭新建/修改的Modal(矿料列表专用)
    setModalStateKl (state, value) {
      state.modalStateKl = value
    }
  },
  actions: {

  }
})
