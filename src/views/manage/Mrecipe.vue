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
  }
}
</style>
<template>
  <div class="mitem">
    <div class="title">
      <div class="left">
        <Select v-model="list.selectItemID" style="width:1.50rem;margin-right:.10rem;" size="large" placeholder="请选择项目">
        <Option v-for="item in list.items" :value="item.mItemID" :key="item.mItemID">{{ item.ItemDes }}</Option>
    </Select>
    <Select v-model="list.selectmItemBid" style="width:1.50rem;margin-right:.15rem;" size="large" placeholder="请选择标段">
        <Option v-for="item in list.mItemBids" :value="item" :key="item">{{ item }}</Option>
    </Select>
    <Button type="primary" size="large" icon="ios-search" v-on:click="getData()">查看材料</Button>
      </div>
      <div class="right">
        <Input
          v-model="inputItem"
          size="large"
          style="margin-right:.15rem;"
          placeholder="请输入搜索的配方名称"
        />
        <Button type="primary" size="large" icon="ios-search" style="margin-right:.15rem;" v-on:click="getData()">搜索材料</Button>
        <Button type="success" size="large" icon="md-add" @click="createNewItem()">新建材料</Button>
      </div>
    </div>
    <div class="bottom">
      <Table border :columns="itemTitle" :data="itemlist" :loading="loading" no-data-text="暂无数据，请切换查看条件查看数据">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: .05rem" @click="more(index)">级配</Button>
        <Button type="primary" size="small" style="margin-right: .05rem" @click="modify(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Modal v-model="delectmodal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除材料:{{delectItemDes}}</span>
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
       <Modal v-model="showMoreModel" width="1500">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>矿料列表</span>
        </p>
        <RecipeKlList v-if="showMoreModel"></RecipeKlList>
        <!-- <Table v-if="showMoreModel" :columns="moreitemTitle" :data="moreitemlist"></Table> -->
        <div slot="footer"></div>
    </Modal>
    <!-- 新建项目模态框 -->
    <Modal v-model="showNewModal" width="900">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>新建材料</span>
        </p>
        <NewRecipe v-if="showNewModal"></NewRecipe>
        <div slot="footer"></div>
    </Modal>
    <!-- 修改项目模态框 -->
       <Modal v-model="showModifyModal" width="900" >
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>修改材料</span>
        </p>
        <NewRecipe v-if="showModifyModal"></NewRecipe>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import NewRecipe from '@/components/NewRecipe.vue'
import RecipeKlList from '@/components/RecipeKlList.vue'
export default {
  data () {
    return {
      loading: true,
      modal_loading: false,
      // 选择项目列表,选择标段列表
      list: {
        items: [{ 'mItemID': 1, 'ItemDes': '我是项目名字', 'mItemBidSun': 1 }],
        // 选择的项目ID
        selectItemID: '',
        mItemBids: [],
        // 选择的标段
        selectmItemBid: ''
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
      selectmClID: '',
      delectItemDes: '',
      showNewModal: false,
      showModifyModal: false,
      showMoreModel: false,
      itemTitle: [
        {
          title: '材料ID',
          key: 'mClID',
          width: 80
        },
        {
          title: '材料类型名称',
          key: 'mClType',
          width: 150
        },
        {
          title: '材料名称',
          key: 'mClName'
        },
        {
          title: '油石比',
          key: 'mClYSB'
        },
        {
          title: '温度标准',
          key: 'mClTemp'
        },
        {
          title: '项目标段',
          key: 'mItemBid'
        },
        {
          title: '项目ID',
          key: 'mItemBid',
          width: 80
        },
        {
          title: '项目描述',
          key: 'mItemDes'
        },
        {
          title: '操作',
          slot: 'action',
          width: 220,
          align: 'center'
        }
      ],
      // 列表数据
      // itemlist: [{ 'mDevID': 3, 'mDevSn': 2019000002, 'mDevType': 209, 'mDevName': '拌和测试1', 'mDevPhoneNo': null, 'mDevStatus': 1, 'mItemID': 1, 'mItemBid': 1, 'mDevGpsX': 2.34, 'mDevGpsY': 3.44, 'mDevTypeName': '拌和站', 'mItemDes': 'AAA' }]
      itemlist: []
    }
  },
  watch: {
    showMoreModel: function (newVal, oldVal) {
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
    // this.list.selectItemID
    computedmItemID: function getBd (newVal) {
      if (newVal === '') {
        this.list.mItemBids = []
        return
      }
      this.getCurrentBd()
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
    computedmItemID: function () {
      return this.list.selectItemID
    },
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
    getCurrentBd () {
      // 根据不同的项目得到不同的标段
      // 得到项目的标段
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.list.selectItemID
      }
      this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          let bdArr = []
          for (let num = rs.data.mItemBidSun; num > 0; num--) {
            bdArr.push(num)
          }
          bdArr.push('全部')
          this.list.mItemBids = bdArr
        }
      }, (err) => { console.log(err) })
    },
    getSelectData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      // 得到所有项目
      this.comFun.post('/User/getUserItem', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.list.items = rs.data
          // 加一个全部
          this.list.items.push({
            'mItemID': '', 'ItemDes': '全部', 'mItemBidSun': '全部', 'mItemJGUint': ''
          })
        }
      }, (err) => { console.log(err) })
    },
    // 查看list
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.list.selectItemID,
        mItemBid: this.list.selectmItemBid,
        page: this.page.current,
        rows: this.page.rows,
        keywords: this.inputItem
      }
      console.log(JSON.stringify(obj))

      this.comFun.post('/Cl/getBhClList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理数据
          rs.data.map((item, index, arr) => {
            // 0:完结 1:工作中
            arr[index].mDevStatus = item.mDevStatus ? '工作中' : '完结'
            arr[index].mClTemp = item.mClTemp + '℃'
            arr[index].mClYSB = item.mClYSB + '%'
          })
          this.itemlist = rs.data
          this.page.totaldata = rs.total
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 修改，编辑材料
    modify (index) {
      this.selectIndex = index
      this.selectItemID = this.itemlist[this.selectIndex].mClID
      this.$store.commit('selectItemID', this.selectItemID)
      this.showModifyModal = true
    },
    // 新建设备
    createNewItem () {
      this.showNewModal = true
    },
    // 准备删除
    remove (index) {
      this.delectItemDes = this.itemlist[index].mClTypeName
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      this.selectmClID = this.itemlist[this.selectIndex].mClID
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.list.selectItemID,
        mClID: this.selectmClID
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
    // 级配（得到矿料列表，操作矿料）
    more (index) {
      this.showMoreModel = true
      this.selectmClID = this.itemlist[index].mClID
      this.$store.commit('selectItemID', this.selectmClID)
    },
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    },
    // 导入项目和修改项目关闭的时候情况store
    clearStoreSelectItemID () {
      this.$store.commit('selectItemID', '')
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RecipeKlList,
    // eslint-disable-next-line vue/no-unused-components
    NewRecipe
  }
}
</script>
