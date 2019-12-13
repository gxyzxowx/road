<!-- 设备管理 -->
<style lang="less">
  .equip{
    display: flex;
    ul{
      width: 1.5rem;
      li{
        width: 100%;
        height: .46rem;
        line-height: .46rem;
        font-size: .18rem;
        color:#333;
        text-align: center;
      }
    }
  }
</style>
<template>
  <div class="equip">
    <ul>
      <li>项目1简称</li>
    </ul>
    <div class="list">
      <h3>所有设备</h3>
      <Table  height="82" :loading="loading" border :columns="listTitle" :data="datalist" size="small"  stripe></Table>
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
          title: '设备名称',
          key: 'title'
        },
        {
          title: '类型',
          key: 'title'
        },
        {
          title: '编号',
          key: 'mDateTime'
        },
        {
          title: '项目简称',
          key: 'mItemBid'
        },
        {
          title: '标段简称',
          key: 'mItemBid'
        },
        {
          title: '状态',
          key: 'mItemBid'
        },
        {
          title: '物联卡号',
          key: 'mAlarmLevel'
        },
        {
          title: '操作',
          key: 'mAlarmLevel'
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
