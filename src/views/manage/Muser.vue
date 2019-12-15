<!-- 用户管理 -->
<style lang="less" scoped>
  .equip{
    display: flex;
    height: 100%;
    .ul{
      width: 1.5rem;
      li{
        width: 100%;
        height: .46rem;
        line-height: .46rem;
        font-size: .18rem;
        color:#333;
        text-align: center;
        &.active{
          color:#6996F3;
          background: #F0F4FE;
        }
      }
    }
    .list{
      background: #F0F4FE;
      width: 100%;
      height: 100%;
      padding: .39rem;
      h3{
        margin-bottom: .4rem;
      }
    }
  }
</style>
<template>
  <div class="equip">
    <ul class="ul">
      <li>项目1简称</li>
      <li>项目1简称</li>
      <li class="active">项目1简称</li>
    </ul>
    <div class="list">
      <h3>用户列表</h3>
      <Table  height="82" :loading="loading" border :columns="listTitle" :data="datalist" size="small"  stripe>
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
      <div style="margin: .1rem;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.totaldata" :current.sync="page.current" :page-size="page.rows" @on-change="changePage"></Page>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      page: {
        // 数据总条数
        totaldata: 1,
        // 当前页数
        current: 1,
        // 每页条数
        rows: 7
      },
      listTitle: [
        {
          title: '用户名',
          key: 'title'
        },
        {
          title: '密码',
          key: 'title'
        },
        {
          title: '姓名',
          key: 'mDateTime'
        },
        {
          title: '电话',
          key: 'mItemBid'
        },
        {
          title: '单位',
          key: 'mItemBid'
        },
        {
          title: '权限',
          key: 'mItemBid'
        },
        {
          title: '预警等级',
          key: 'mAlarmLevel'
        },
        {
          title: '短信',
          key: 'mAlarmLevel'
        },
        {
          title: '微信',
          key: 'mAlarmLevel'
        },
        {
          title: '操作',
          slot: 'action',
          width: 160,
          align: 'center'
        }
      ],
      datalist: [
        {
          title: 'abc'
        }
      ]
    }
  },
  methods: {
    changePage () {
      // 更换页数
      // this.getData()
      console.log('切换page:' + this.page.current)
    }
  }
}
</script>
