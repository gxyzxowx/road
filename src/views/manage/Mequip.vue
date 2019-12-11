<template>
  <div>

  </div>
</template>
<style lang="less" scoped>
.mitem {
  margin: .15rem;
  .title {
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
    }
    .left,
    .right {
      margin: .20rem 0;
    }
    .left {
      .select {
        width: 1.50rem;
        margin-right: .10rem;
      }
    }
  }
  .bottom {
    .inner-btn {
      margin-right: .05rem;
    }
  }
}
</style>
<template>
  <div class="mitem">
    <div class="title">
      <div class="left">
        <Select v-model="list.selectItemID" class="select" size="large" placeholder="请选择项目">
        <Option v-for="item in list.items" :value="item.mItemID" :key="item.mItemID">{{ item.ItemDes }}</Option>
    </Select>
    <Select v-model="list.selectmDevType" class="select" size="large" placeholder="请选择设备类型">
        <Option v-for="item in list.mDevType" :value="item.mDevType" :key="item.mDevType">{{ item.mDevTypeName }}</Option>
    </Select>
    <Button type="primary" size="large" icon="ios-search" v-on:click="getData()">查看设备</Button>
      </div>
      <div class="right">
        <Input
          v-model="inputItem"
          size="large"
          style="margin-right:.15rem;"
          placeholder="请输入搜索的设备名称"
        />
        <Button type="primary" size="large" icon="ios-search" style="margin-right:.15rem;" v-on:click="getData()">搜索设备</Button>
        <Button type="success" size="large" icon="md-add" @click="createNewItem()">新建设备</Button>
      </div>
    </div>
    <div class="bottom">
      <Table border :columns="itemTitle" :data="itemlist" :loading="loading" no-data-text="暂无数据，请切换查看条件查看数据">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" class="inner-btn" @click="more(index)">更多</Button>
        <Button type="primary" size="small" class="inner-btn" @click="modify(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Modal v-model="delectmodal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除项目:{{delectItemDes}}</span>
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
    <Switch v-model="loading"></Switch>
      <div style="margin: .10rem;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.totaldata" :current.sync="page.current" :page-size="page.rows" @on-change="changePage"></Page>
        </div>
    </div>
    </div>
    <!-- 查看更多模态框 -->
       <Modal v-model="showMoreModel" width="900">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>查看更多</span>
        </p>
        <Table v-if="showMoreModel" :columns="moreitemTitle" :data="moreitemlist" height=700></Table>
        <div slot="footer"></div>
    </Modal>
    <!-- 新建设备模态框 -->
    <Modal v-model="showNewModal" width="900">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>新建设备</span>
        </p>
        <NewEquip v-if="showNewModal"></NewEquip>
        <div slot="footer"></div>
    </Modal>
    <!-- 修改设备模态框 -->
       <Modal v-model="showModifyModal" width="900">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>修改设备</span>
        </p>
        <NewEquip v-if="showModifyModal"></NewEquip>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import NewEquip from '@/components/NewEquip.vue'
import moredev209 from '@/data/moredev1.json'
import moredev210211 from '@/data/moredev2.json'
export default {
  data () {
    return {
      loading: true,
      modal_loading: false,
      // 选择项目列表,选择设备类型列表
      list: {
        items: [{ 'mItemID': 1, 'ItemDes': '我是项目名字', 'mItemBidSun': 1 }],
        // 选择的项目ID
        selectItemID: '',
        mDevType: [{ 'mDevTypeName': '拌和站', 'mDevType': 209 }],
        // 选择的设备类型ID
        selectmDevType: ''
      },
      page: {
        // 数据总条数
        totaldata: 1,
        // 当前页数
        current: 1,
        // 每页条数
        rows: 5
      },
      delectmodal: false,
      // 删除的索引
      selectIndex: null,
      // 搜索框输入的设备名称
      inputItem: '',
      // 操作的设备id
      selectDevID: '',
      delectItemDes: '',
      showNewModal: false,
      showModifyModal: false,
      showMoreModel: false,
      itemTitle: [
        {
          title: '设备ID',
          key: 'mDevID',
          width: 80
        },
        {
          title: '设备编号',
          key: 'mDevSn',
          width: 150
        },
        {
          title: '设备类型',
          key: 'mDevTypeName'
        },
        {
          title: '设备名',
          key: 'mDevName'
        },
        {
          title: '设备联系电话',
          key: 'mDevPhoneNo'
        },
        {
          title: '设备状态',
          key: 'mDevStatus'
        },
        {
          title: '项目ID',
          key: 'mItemID',
          width: 80
        },
        {
          title: '项目名称',
          key: 'mItemDes'
        },
        {
          title: '设备标段',
          key: 'mItemBid',
          width: 80
        },
        {
          title: '经度',
          key: 'mDevGpsX'
        },
        {
          title: '纬度',
          key: 'mDevGpsY'
        },
        {
          title: '操作',
          slot: 'action',
          width: 179,
          align: 'center'
        }
      ],
      // 列表数据
      // itemlist: [{ 'mDevID': 3, 'mDevSn': 2019000002, 'mDevType': 209, 'mDevName': '拌和测试1', 'mDevPhoneNo': null, 'mDevStatus': 1, 'mItemID': 1, 'mItemBid': 1, 'mDevGpsX': 2.34, 'mDevGpsY': 3.44, 'mDevTypeName': '拌和站', 'mItemDes': 'AAA' }]
      itemlist: [],
      // 查看更多的列表
      moreitemlist: [],
      moreitemTitle: [{
        title: '名称',
        key: 'title'
      }, {
        title: '值',
        key: 'value'
      }]
    }
  },
  watch: {
    showExcelModel: function (newVal, oldVal) {
      // 监听到关闭时
      if (!newVal) {
        this.clearStoreSelectItemID()
      }
    },
    showModifyModal: function (newVal, oldVal) {
      if (!newVal) {
        this.clearStoreSelectItemID()
      }
    },
    // 监听模态框的状态
    storeModalState: function (newVal) {
      console.log('监听到关闭modal')
      if (newVal === false) {
        this.showNewModal = false
        this.showModifyModal = false
        // 重新刷新数据
        this.getData()
        // 模态框状态归零
        this.$store.commit('setModalState', '')
      }
    }
  },
  computed: {
    // 监听模态框的状态
    storeModalState: function () {
      return this.$store.state.modalState
    }
  },
  mounted () {
    // 一打开呈现所有项目
    this.getData()
    // 得到选项的选择项
    this.getSelectData()
  },
  methods: {
    // 查看更多，处理数据
    handleMoreData (objdata) {
      let titledata = []
      // 如果是拌和站209
      if (objdata.mDevType === 209) {
        titledata = moredev209
      } else {
        // 如果是摊铺和碾压210、211
        titledata = moredev210211
      }
      titledata.map((item, index, arr) => {
        titledata[index].value = objdata[item.key]
        // 处理数据单位
        if (item.key === 'mDevGpsX') {
          titledata[index].value = item.value + '°'
        }
        if (item.key === 'mDevGpsY') {
          titledata[index].value = item.value + '°'
        }
        if (item.key === 'mDevStatus') {
          titledata[index].value = item.value ? '工作中' : '不工作'
        }
      })
      return titledata
    },
    getSelectData (search) {
      if (search) {
        this.page.current = 1
      }
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        page: this.page.current,
        rows: this.page.rows,
        keywords: this.inputItem
      }
      // 得到所有项目
      this.comFun.post('/User/getUserItem', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.list.items = rs.data
          // 加一个全部
          this.list.items.push({
            'mItemID': '', 'ItemDes': '全部', 'mItemBidSun': '全部', 'mItemJGUint': ''
          })
        }
      }, (err) => { console.log(err) })
      // 得到所有设备类型
      this.comFun.post('/Dev/getDevType', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.list.mDevType = rs.data
        }
      }, (err) => { console.log(err) })
    },
    // 查看list
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.list.selectItemID,
        mDevType: this.list.selectmDevType,
        page: this.page.current,
        rows: this.page.rows,
        keywords: this.inputItem
      }
      console.log(JSON.stringify(obj))

      this.comFun.post('/Dev/getDevList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理数据
          rs.data.map((item, index, arr) => {
            // 0:完结 1:工作中
            arr[index].mDevStatus = item.mDevStatus ? '工作中' : '完结'
            arr[index].mDevGpsX = item.mDevGpsX + '°'
            arr[index].mDevGpsY = item.mDevGpsY + '°'
          })
          this.itemlist = rs.data
          this.page.totaldata = rs.total
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 修改，编辑设备
    modify (index) {
      this.selectIndex = index
      this.selectDevID = this.itemlist[this.selectIndex].mDevID
      this.$store.commit('selectItemID', this.selectDevID)
      this.$store.commit('equipUseItemID', this.list.selectItemID)
      this.showModifyModal = true
    },
    // 新建设备
    createNewItem () {
      this.showNewModal = true
    },
    // 准备删除
    remove (index) {
      this.delectItemDes = this.itemlist[index].mDevName
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      this.selectDevID = this.itemlist[this.selectIndex].mDevID
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.list.selectItemID,
        mDevID: this.selectDevID
      }
      this.comFun.post('/Dev/userDeleteDev', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.modal_loading = true
          setTimeout(() => {
            this.modal_loading = false
            this.delectmodal = false
            this.itemlist.splice(this.selectIndex, 1)
            this.$Message.success('成功删除设备')
          }, 1000)
        }
      }, (err) => { console.log(err) })
    },
    // 查看更多
    more (index) {
      this.showMoreModel = true
      this.selectDevID = this.itemlist[index].mDevID
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.list.selectItemID,
        mDevID: this.selectDevID
      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Dev/getDevInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.moreitemlist = this.handleMoreData(rs.data)
        }
      }, (err) => { console.log(err) })
    },
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    },
    // 导入项目和修改项目关闭的时候情况store
    clearStoreSelectItemID () {
      this.$store.commit('selectItemID', '')
      this.$store.commit('equipUseItemID', '')
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NewEquip
  }
}
</script>
