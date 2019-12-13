<style scoped>
  .content{
    margin-top: .30rem;
  }
  .table{
    width: 12rem;
    overflow: hidden;
  }
  .tableinner{
    width: 100%;

  }
</style>
<template>
  <div class="scgrade">
    <Search v-on:getData="getData"></Search>
<div class="content">
          <!-- 级配列表 -->
          <div class="table">
            <div class="tableinner">
<Table :loading="loading" border :columns="listTitle" :data="datalist"></Table>
            </div>

          </div>

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
import Search from '@/components/Search.vue'
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
        rows: 10
      },
      // 点击搜索产生的值暂存
      emitobj: {
        mClTypeValue: '',
        mItemBid: '',
        start_time: '',
        end_time: ''
      },
      listTitle: [
        {
          title: '时间',
          key: 'mBhDateTime',
          width: 170
        },
        {
          title: '总量',
          key: 'mBhItemNO',
          width: 100
        },
        {
          title: '油石比',
          key: 'mBnYSB',
          width: 100
        },
        {
          title: '沥青量',
          key: 'mBhActualDSL',
          width: 100
        }
      ],
      datalist: []
    }
  },
  mounted () {
    // 处理listTitle
    for (let i = 1; i <= 12; i++) {
      this.listTitle.push({
        title: '石料' + i + '投料量(x%)',
        key: 'rep' + i,
        width: 150
      })
    }
    this.getData()
  },
  methods: {
    getData (emitobj) {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.$store.state.itemInfo.id,
        page: this.page.current,
        rows: this.page.rows
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        // console.log('是emit过来的参数:' + JSON.stringify(emitobj))
      }
      obj = { ...obj, ...this.emitobj }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/getProductRecipeList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 总页数
          this.page.totaldata = rs.total
          rs.data.map((item, index, arr) => {
            // 处理24种数据为12种
            for (var i = 1; i <= 12; i++) {
              arr[index]['rep' + i] = item['mBhActualSN' + i] + '(' + item['mBhActualBLSN' + i] + '%)'
            }
            // 处理油石比数据单位
            arr[index].mBnYSB = item.mBnYSB + '%'
            // 处理公斤
            arr[index].mBhItemNO = item.mBhItemNO + 'kg'
            arr[index].mBhActualDSL = item.mBhActualDSL + 'kg'
          })
          this.datalist = rs.data
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
