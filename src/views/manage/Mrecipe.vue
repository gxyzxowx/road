<!-- 生产管理 -->
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
      position: relative;
      background: #F0F4FE;
      width: 100%;
      height: 100%;
      padding: .39rem;
      .table{
        width: 14.2rem;
      }
      h3{
        margin-bottom: .4rem;
      }
      .addbtn{
        position: absolute;
        top:.5rem;
        right: .6rem;
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
      <h3>材料列表</h3>
       <Button  class="addbtn" size="large" type="primary" @click="add()">+ 添加</Button>
      <Table  class="table" border :columns="listTitle" :data="datalist" size="small"  stripe>
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
      delectmodal: false,
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
          title: '材料名称',
          width: 160,
          key: 'title'
        },
        {
          title: '类型',
          width: 160,
          key: 'title'
        },
        {
          title: '层面',
          width: 160,
          key: 'mDateTime'
        },
        {
          title: '项目简称',
          width: 160,
          key: 'mItemBid'
        },
        {
          title: '标段简称',
          width: 160,
          key: 'mItemBid'
        },
        {
          title: '预计产量',
          width: 160,
          key: 'mItemBid'
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
    },
    // 增加材料页面
    add () {
      this.$router.push({
        path: '/manage/recipe/new',
        query: {
          id: 5
        }
      })
    }
  }
}
</script>
