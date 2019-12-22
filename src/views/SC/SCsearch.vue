<!-- 综合查询 -->
<style lang="less" scoped>
  .scsearch{
    padding: .4rem;
    .content{
      margin-top: .2rem;
    }
  }
</style>
<template>
  <div class="scsearch">
    <div class="search">
         <Search v-on:getData="getData"></Search>
    </div>

    <div class="content">
      <h4>综合查询</h4>
      <Table  :loading="loading" height="300" border :columns="listTitle" :data="datalist" size="small" stripe></Table>
      <Switch v-model="loading"></Switch>
      <div style="margin: .10rem;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.totaldata" :current.sync="page.current" :page-size="page.rows" @on-change="changePage"></Page>
        </div>
    </div>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SC/DataSearch.vue'
import titledata from '@/data/scsearch.json'
export default {
  data () {
    return {
      mUserID: 0,
      mItemID: 0,
      loading: true,
      listTitle: titledata,
      datalist: [],
      // 点击搜索产生的值暂存
      emitobj: {
        mClCW: 1,
        mItemBid: 1,
        start_time: '',
        end_time: ''
      },
      page: {
        // 数据总条数
        totaldata: 1,
        // 当前页数
        current: 1,
        // 每页条数
        rows: 10
      }
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.mItemID = this.$store.state.itemInfo.id
    this.getData()
  },
  methods: {
    getData (emitobj) {
      // 默认显示标段1，层位1的数据
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        page: this.page.current,
        rows: this.page.rows
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
        obj = { ...obj, ...this.emitobj }
      }

      console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/dataSearch', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理数据
          let _data = rs.data
          _data.map((item, index, arr) => {
            // 层位
            if (item['mClCW'] === 1) {
              _data[index].mClCW = '上层位'
            } else if (item['mClCW'] === 2) {
              _data[index].mClCW = '中层位'
            } else if (item['mClCW'] === 3) {
              _data[index].mClCW = '下层位'
            }
            // 误差百分数
            for (let i in item) {
              if (i.indexOf('Rep') !== -1) {
                _data[index][i] = parseFloat(item[i]).toFixed(2) + '%'
              }
            }
            // 是否预警
            _data[index].mBhItemTempAlarm = item.mBhItemTempAlarm ? '是' : '否'
            _data[index].mBhYSBAlarm = item.mBhYSBAlarm ? '是' : '否'
            _data[index].mBhSKLAlarm = item.mBhSKLAlarm ? '是' : '否'
          })
          this.datalist = _data
          this.page.totaldata = rs.total
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    }
  },
  components: {
    Search
  }
}
</script>
