<!-- 用户管理 -->
<style lang="less" scoped>
</style>
<template>
  <div class="equip">
    <ul class="ul">
      <li v-for="(item, index) in itemlist" :key="index" :class="{active:index==isactive}" @click="choseItem(index)">{{item.mItemJC}}</li>
    </ul>
    <div class="main">
    <div class="list">
      <h3>用户列表</h3>
      <Button  class="addbtn" size="large" type="primary" @click="linktoPage(-1)">+ 添加</Button>
      <Table class="table" border :columns="listTitle" :data="datalist" size="small" stripe>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: .05rem" @click="linktoPage(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Modal v-model="delectmodal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除用户:{{delectText}}</span>
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

  </div>
</template>
<script>
import '@/assets/css/equiplist.css'
export default {
  data () {
    return {
      // 默认选中第一个项目
      isactive: 0,
      mItemID: 0,
      mUserID: 0,
      loading: true,
      modal_loading: false,
      delectmodal: false,
      selectIndex: 0,
      itemlist: [],
      delectText: '',
      listTitle: [
        {
          title: '用户名',
          width: 160,
          fixed: 'left',
          key: 'mUserName'
        },
        {
          title: '密码',
          width: 160,
          key: 'mUserPwd'
        },
        {
          title: '姓名',
          width: 160,
          key: 'mUserXM'
        },
        {
          title: '电话',
          width: 160,
          key: 'mUserDHHM'
        },
        {
          title: '微信号',
          width: 160,
          key: 'mUserWXHM'
        },
        {
          title: '单位',
          width: 160,
          key: 'mUserDW'
        },
        {
          title: '权限',
          width: 160,
          key: 'mUserLevel'
        },
        {
          title: '预警等级',
          width: 160,
          key: 'mUserYJDJ'
        },
        {
          title: '短信通知',
          width: 160,
          key: 'mUserDXTZ'
        },
        {
          title: '微信通知',
          width: 160,
          key: 'mUserWXTZ'
        },
        {
          title: '操作',
          slot: 'action',
          width: 160,
          fixed: 'right',
          align: 'center'
        }
      ],
      datalist: [
      ]
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
      // 弹出用户列表datalist
      this.comFun.post('/User/getUserList', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
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
        _id = this.datalist[index]['mUserID']
      }

      this.$router.push({
        path: '/manage/user/new',
        query: {
          id: _id,
          mItemID: this.mItemID
        }
      })
    },
    // 准备删除
    remove (index) {
      this.delectText = this.datalist[index].mUserName
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      let _mUserID = this.datalist[this.selectIndex].mUserID
      let obj = {
        mUserID: this.mUserID,
        delUserID: _mUserID
      }
      this.comFun.post('/User/userDeleteAdmin', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.modal_loading = true
          setTimeout(() => {
            this.modal_loading = false
            this.delectmodal = false
            this.datalist.splice(this.selectIndex, 1)
            this.$Message.success('成功删除用户')
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
