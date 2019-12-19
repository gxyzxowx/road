<!-- 生产管理(原配方管理) -->
<style lang="less" scoped>

</style>
<template>
  <div class="equip">
    <ul class="ul">
      <li v-for="(item, index) in itemlist" :key="index" :class="{active:index==isactive}" @click="choseItem(index)">{{item.mItemJC}}</li>
    </ul>
    <div class="list">
      <h3>材料列表</h3>
       <Button  class="addbtn" size="large" type="primary" @click="linktoPage(-1)">+ 添加</Button>
      <Table  class="table" border :columns="listTitle" :data="datalist" size="small"  stripe>
        <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: .05rem" @click="linktoPage(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Modal v-model="delectmodal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除材料:{{delectText}}</span>
          </p>
          <div style="text-align:center">
            <p>删除后不可恢复</p>
            <p>你确定删除吗?</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="delItem">删除</Button>
          </div>
        </Modal>
      </template>
      </Table>
    </div>
  </div>
</template>
<script>
import '@/assets/css/equiplist.css'
export default {
  data () {
    return {
      // 默认选中第一个项目
      isactive: 0,
      mUserID: 0,
      // itemlist默认选中第一个时获得当前选中项目
      mItemID: 0,
      loading: true,
      modal_loading: false,
      delectmodal: false,
      selectIndex: 0,
      itemlist: [],
      delectText: '',
      listTitle: [
        {
          title: '材料名称',
          fixed: 'left',
          width: 160,
          key: 'mClName'
        },
        {
          title: '类型',
          width: 160,
          key: 'mClType'
        },
        {
          title: '层面',
          key: 'mClCW'
        },
        {
          title: '项目简称',
          key: 'mItemJC'
        },
        {
          title: '标段简称',
          key: 'mItemBDJC'
        },
        {
          title: '预计产量',
          key: 'mClYJCL'
        },
        {
          title: '操作',
          fixed: 'right',
          slot: 'action',
          width: 160,
          align: 'center'
        }
      ],
      datalist: []
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.getItemlist()
  },
  methods: {
    choseItem (_index) {
      // 改变样式
      this.isactive = _index
      this.mItemID = this.itemlist[_index]['mItemID']
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID
      }
      // 弹出材料列表datalist
      this.comFun.post('/Cl/getBhClList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          let _data = rs.data
          _data.map((item, index, arr) => {
            // if(item['mUserLevel'])
          })
          this.datalist = rs.data
        }
      }, (err) => { console.log(err) })
    },
    linktoPage (index) {
      let _id = index
      if (index !== -1) {
        _id = this.datalist[index]['mClID']
      }

      this.$router.push({
        path: '/manage/recipe/new',
        query: {
          id: _id,
          mItemID: this.mItemID
        }
      })
    },
    // 准备删除
    remove (index) {
      this.delectText = this.datalist[index].mClName
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      let mClID = this.datalist[this.selectIndex].mClID
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        mClID: mClID
      }
      this.comFun.post('/Cl/userDeleteBhCl', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.modal_loading = true
          setTimeout(() => {
            this.modal_loading = false
            this.delectmodal = false
            this.datalist.splice(this.selectIndex, 1)
            this.$Message.success('成功删除材料')
          }, 1000)
        }
      }, (err) => { console.log(err) })
    },
    getItemlist () {
      let obj = {
        mUserID: this.mUserID
      }
      this.comFun.post('/Item/getItemList', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.itemlist = rs.data
          // 默认出来第一个
          this.choseItem(0)
        }
      }, (err) => { console.log(err) })
    }
  }
}
</script>
