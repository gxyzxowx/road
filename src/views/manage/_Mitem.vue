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
    <div class="title" ref="header">
      <div class="left">
        <Button type="success" size="large" icon="md-add" @click="createNewItem()">新建项目</Button>
      </div>
      <div class="right">
        <Input
          v-model="inputItem"
          size="large"
          style="margin-right:.15rem;"
          placeholder="请输入搜索的项目名称"
        />
        <Button type="primary" size="large" icon="ios-search" v-on:click="getData(true)">搜索项目</Button>
      </div>
    </div>
    <div class="bottom">
      <Table border :columns="itemTitle" :data="itemlist" :loading="loading" :width="width">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" style="margin-right: .05rem" @click="importExcel(index)">导入</Button>
        <Button type="primary" size="small" style="margin-right: .05rem" @click="modify(index)">修改</Button>
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
    <!-- 导入数据模态框 -->
      <Modal
        v-model="showExcelModel"
        title="导入数据">
        <ImportExcel></ImportExcel>
    <div slot="footer"></div>
    </Modal>
    <!-- 新建项目模态框 -->
    <Modal v-model="showNewProject" width="900">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>新建项目</span>
        </p>
        <NewProject v-if="showNewProject"></NewProject>
        <div slot="footer"></div>
    </Modal>
    <!-- 修改项目模态框 -->
       <Modal v-model="showModifyProject" width="900" >
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>修改项目</span>
        </p>
        <NewProject v-if="showModifyProject"></NewProject>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import NewProject from '@/components/NewProject.vue'
import ImportExcel from '@/components/ImportExcel.vue'
export default {
  data () {
    return {
      width: '1200',
      loading: true,
      modal_loading: false,
      page: {
        // 数据总条数
        totaldata: 1,
        // 当前页数
        current: 1,
        // 每页条数
        rows: 8
      },
      delectmodal: false,
      // 删除的索引
      selectIndex: null,
      // 搜索框输入的项目名称
      inputItem: '',
      selectItemID: '',
      delectItemDes: '',
      showExcelModel: false,
      showNewProject: false,
      showModifyProject: false,
      itemTitle: [
        {
          title: '项目描述',
          key: 'mItemDes',
          width: 180,
          fixed: 'left'
        },
        // {
        //   title: '项目ID',
        //   key: 'mItemID',
        //   width: 80
        // },
        {
          title: '标段数量',
          key: 'mItemBidSun',
          width: 100
        },
        {
          title: '项目总长度',
          key: 'mItemTotalLength',
          width: 110
        },
        {
          title: '项目状态',
          key: 'mItemActive',
          width: 100
        },
        {
          title: '项目负责人',
          key: 'mItemAdmin',
          width: 110
        },
        {
          title: '项目联系电话',
          key: 'mItemPhoneNo',
          width: 130
        },
        {
          title: '建设单位',
          key: 'mItemSGUint',
          width: 150
        },
        {
          title: '咨询单位',
          key: 'mItemJGUint',
          width: 150
        },
        {
          title: '一级预警联系人',
          key: 'mAlarmLev1Name',
          width: 100
        },
        {
          title: '一级预警联系电话',
          key: 'mAlarmLev1PhoneNo',
          width: 150
        },
        {
          title: '二级预警联系人',
          key: 'mAlarmLev2Name',
          width: 100
        },
        {
          title: '二级预警联系电话',
          key: 'mAlarmLev2PhoneNo',
          width: 150
        },
        {
          title: '三级预警联系人',
          key: 'mAlarmLev3Name',
          width: 100
        },
        {
          title: '三级预警联系电话',
          key: 'mAlarmLev3PhoneNo',
          width: 100
        },
        {
          title: '操作',
          slot: 'action',
          width: 179,
          align: 'center',
          fixed: 'right'
        }
      ],
      itemlist: [
        {
          'mItemID': 1,
          'mItemBidSun': 1,
          'mItemTotalLength': 0,
          'mItemActive': 1,
          'mItemDes': 'AAA',
          'mItemAdmin': 'AAA',
          'mItemPhoneNo': '123456',
          'mItemSGUint': 'BBB',
          'mItemJGUint': 'BBB',
          'mAlarmLev1Name': '13629731011',
          'mAlarmLev1PhoneNo': '13629731011',
          'mAlarmLev2Name': null,
          'mAlarmLev2PhoneNo': null,
          'mAlarmLev3Name': null,
          'mAlarmLev3PhoneNo': null
        }
      ]
    }
  },
  watch: {
    showExcelModel: function (newVal, oldVal) {
      // 监听到关闭时
      if (!newVal) {
        this.clearStoreSelectItemID()
      }
    },
    // 监听到关闭时
    showModifyProject: function (newVal, oldVal) {
      if (!newVal) {
        this.clearStoreSelectItemID()
      }
    },
    storeModalState: function (newVal) {
      console.log('监听到了模态框被关闭了')
      if (newVal === false) {
        // 模态框关闭
        this.showNewProject = false
        this.showModifyProject = false
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
    this.getData()
    this.$nextTick(() => { // 页面渲染完成后的回调
      this.width = this.$refs.header.offsetWidth
    })
  },
  methods: {
    getData (search) {
      if (search) {
        this.page.current = 1
      }
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        page: this.page.current,
        rows: this.page.rows,
        keywords: this.inputItem
      }
      this.comFun.post('/User/getItemList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.page.totaldata = rs.total
          rs.data.map((item, index, arr) => {
            rs.data[index]['mItemActive'] = item['mItemActive'] ? '进行中' : '完结'
          })
          this.itemlist = rs.data
        }
      }, (err) => { console.log(err) })
    },
    // 修改，编辑项目
    modify (index) {
      this.selectIndex = index
      this.selectItemID = this.itemlist[this.selectIndex].mItemID
      this.$store.commit('selectItemID', this.selectItemID)
      this.showModifyProject = true
    },
    // 新建项目
    createNewItem () {
      this.showNewProject = true
    },
    // 准备删除
    remove (index) {
      this.delectItemDes = this.itemlist[index].mItemDes
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      this.selectItemID = this.itemlist[this.selectIndex].mItemID
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.selectItemID
      }
      this.comFun.post('/User/userDeleteItem', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.modal_loading = true
          setTimeout(() => {
            this.modal_loading = false
            this.delectmodal = false
            this.itemlist.splice(this.selectIndex, 1)
            this.$Message.success('成功删除项目')
          }, 1000)
        }
      }, (err) => { console.log(err) })
    },
    // 导入EXCEL数据表打开
    importExcel (index) {
      this.selectIndex = index
      this.selectItemID = this.itemlist[this.selectIndex].mItemID
      this.$store.commit('selectItemID', this.selectItemID)
      this.showExcelModel = true
    },
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    },
    // 导入项目和修改项目关闭的时候情况store
    clearStoreSelectItemID () {
      this.$store.commit('selectItemID', '')
    },
    // emit消息后关闭页面
    closeModal () {
      console.log('监听到了')
      this.showNewProject = false
      this.showModifyProject = false
      // this.$nextTick(() => {
      // this.showView = true // DOM更新后再通过v-if添加router-view节点
      // })
    }
  },
  components: {
    NewProject,
    ImportExcel
  }
}
</script>
