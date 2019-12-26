<!-- 设备管理 -->
<style lang="less" scoped>
</style>
<template>
  <div class="equip">
    <ul class="ul">
      <li v-for="(item, index) in itemlist" :key="index" :class="{active:index==isactive}" @click="choseItem(index)">{{item.mItemJC}}</li>
    </ul>
    <div class="list">
      <h3>所有设备</h3>
       <Button  class="addbtn" size="large" type="primary" @click="linktoPage(-1)">+ 添加</Button>
      <Table   :loading="loading" class="table" border :columns="listTitle" :data="datalist" size="small"  stripe max-height="590">
        <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: .05rem" @click="linktoPage(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Modal v-model="delectmodal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除设备:{{delectText}}</span>
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
      isactive: 0,
      mUserID: 0,
      mItemID: 0,
      delectText: '',
      selectIndex: 0,
      loading: true,
      modal_loading: false,
      delectmodal: false,
      itemlist: [],
      listTitle: [
        {
          title: '设备名称',
          key: 'mDevName'
        },
        {
          title: '类型',
          key: 'mDevType'
        },
        {
          title: '编号',
          key: 'mDevSn'
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
          title: '状态',
          key: 'mDevStatus'
        },
        {
          title: '物联卡号',
          key: 'mDevPhoneNo'
        },
        {
          title: '操作',
          slot: 'action',
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
      // 弹出设备列表datalist
      this.comFun.post('/Dev/getDevList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          let _data = rs.data
          // 更改设备类型名字
          _data = this.devType(_data)
          // 更换设备状态 1 工作中， 0非工作中
          _data.map((item, index, arr) => {
            arr[index]['mDevStatus'] = item['mDevStatus'] ? '工作中' : '非工作中'
          })
          this.datalist = _data
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    linktoPage (index) {
      let _id = index
      if (index !== -1) {
        _id = this.datalist[index]['mDevID']
      }

      this.$router.push({
        path: '/manage/equip/new',
        query: {
          id: _id,
          mItemID: this.mItemID
        }
      })
    },
    getItemlist () {
      let obj = {
        mUserID: this.mUserID
      }
      this.comFun.post('/Item/getItemList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.itemlist = rs.data
          // 默认出来第一个
          this.choseItem(0)
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 准备删除
    remove (index) {
      this.delectText = this.datalist[index].mDevName
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      let mDevID = this.datalist[this.selectIndex].mDevID
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        mDevID: mDevID
      }
      this.comFun.post('/Dev/userDeleteDev', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.modal_loading = true
          setTimeout(() => {
            this.modal_loading = false
            this.delectmodal = false
            this.datalist.splice(this.selectIndex, 1)
            this.$Message.success('成功删除设备')
          }, 1000)
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 拌和站209，碾压机211，摊铺机210
    devType (_data) {
      _data.map((item, index, arr) => {
        if (item['mDevType'] === 209) {
          arr[index]['mDevType'] = '拌和站'
        } else if (item['mDevType'] === 211) {
          arr[index]['mDevType'] = '碾压机'
        } else if (item['mDevType'] === 210) {
          arr[index]['mDevType'] = '摊铺机'
        }
      })
      return _data
    }
  }
}
</script>
