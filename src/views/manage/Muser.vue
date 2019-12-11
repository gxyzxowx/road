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
  }
}
</style>
<template>
  <div class="mitem">
    <div class="title">
      <div class="left">
        <Button type="success" :disabled="btndisabled" size="large" icon="md-add" @click="createNewItem()">新增管理员</Button>
      </div>
      <div class="right">
        <Input
          v-model="inputItem"
          size="large"
          style="margin-right:.15rem;"
          placeholder="请输入搜索的用户名"
        />
        <Button type="primary" size="large" icon="ios-search" v-on:click="getData(true)">搜索管理员</Button>
      </div>
    </div>
    <div class="bottom">
      <Table border :columns="itemTitle" :data="itemlist" :loading="loading">
      <template slot-scope="{ row, index }" slot="itemcols">
        <div v-for="(item, index0) in row.userItem" style="display:flex;">

          <div style="margin:0 .10rem;"><Icon type="ios-flag" />{{item.mItemDes}}</div>
          <div style="color:#ccc;font-size:.12rem;"> （ ID:{{item.mItemID}} ）</div>
          </div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: .05rem" @click="modify(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Modal v-model="delectmodal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除用户:{{delectItemDes}}</span>
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

    <!-- 新建管理员模态框 -->
    <Modal v-model="showNewModal" width="900">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>新建用户</span>
        </p>
        <NewUser v-if="showNewModal"></NewUser>
        <div slot="footer"></div>
    </Modal>
    <!-- 修改管理员模态框 -->
       <!-- <Modal v-model="showModifyModal" width="900" >
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>修改用户</span>
        </p>
        <NewUser v-if="showModifyModal"></NewUser>
    </Modal> -->
    <Modal v-model="showModifyModal" width="900" >
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>修改用户</span>
        </p>
        <ModifyUser v-if="showModifyModal"></ModifyUser>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import NewUser from '@/components/NewUser.vue'
import ModifyUser from '@/components/ModifyUser.vue'
export default {
  data () {
    return {
      btndisabled: false,
      loading: true,
      modal_loading: false,
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
      // 搜索框输入的项目名称
      inputItem: '',
      selectItemID: '',
      delectItemDes: '',
      showNewModal: false,
      showModifyModal: false,
      itemTitle: [
        {
          title: '用户ID',
          width: 80,
          key: 'mUserID'
        },
        {
          title: '用户名',
          key: 'mUserName'
        },
        {
          title: '用户级别',
          key: 'mUserLevel'
        },
        {
          title: '项目数量',
          key: 'num'
        },
        {
          title: '拥有项目',
          slot: 'itemcols',
          width: 380
        },
        {
          title: '操作',
          slot: 'action',
          width: 160,
          align: 'center'
        }
      ],
      itemlist: [
      ]
    }
  },
  watch: {
    // 监听到关闭修改用户模态框时,清除vuex，刷新页面
    showModifyModal: function (newVal, oldVal) {
      if (!newVal) {
        this.clearStoreselectItemID()
        // 重新刷新数据
        this.getData()
      }
    },
    // 监听模态框的状态
    modalState: function (newVal) {
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
    modalState: function () {
      return this.$store.state.modalState
    }
  },
  mounted () {
    this.getData()
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
      // console.log(JSON.stringify(obj))
      this.comFun.post('/User/getUserList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.page.totaldata = rs.total
          rs.data.map((item, index, arr) => {
            arr[index].num = item.userItem.length
            if (item.mUserLevel === 1) { arr[index].mUserLevel = '普通管理员' }
            if (item.mUserLevel === 2) { arr[index].mUserLevel = '超级管理员' }
          })
          this.itemlist = rs.data
        } else {
          this.btndisabled = true
        }
      }, (err) => { console.log(err) })
    },
    // 修改，编辑用户
    modify (index) {
      // console.log(this.itemlist)
      this.selectIndex = index
      this.selectItemID = this.itemlist[this.selectIndex].mUserID
      this.$store.commit('selectItemID', this.selectItemID)
      this.showModifyModal = true
    },
    // 新建项目
    createNewItem () {
      this.showNewModal = true
    },
    // 准备删除
    remove (index) {
      this.delectItemDes = this.itemlist[index].mUserName
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      this.selectItemID = this.itemlist[this.selectIndex].mUserID
      let obj = {
        delUserID: this.selectItemID,
        mUserID: this.comFun.getCookie('roadmUserID')

      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/User/userDeleteAdmin', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.modal_loading = true
          setTimeout(() => {
            this.modal_loading = false
            this.delectmodal = false
            this.itemlist.splice(this.selectIndex, 1)
            this.$Message.success('成功删除成员')
          }, 1000)
        }
      }, (err) => { console.log(err) })
    },
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    },
    // 导入项目和修改项目关闭的时候情况store
    clearStoreselectItemID () {
      this.$store.commit('selectItemID', '')
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NewUser,
    // eslint-disable-next-line vue/no-unused-components
    ModifyUser
  }
}
</script>
