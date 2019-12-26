<style lang="less" scoped>

.content{
  padding:.2rem .4rem;
}
  .curve{
    height: 3rem;
    margin-top: 1rem;
  }
  h3:first-of-type{
    margin-bottom: .1rem;
  }
</style>
<template>
<!-- 施工--摊铺--速度 -->
  <div>
    <div class="search">
      <!-- 条件 -->
      <!-- 摊铺机210里程 -->
      <Search v-on:getData="getData" devType="210" @mDevID="getDevID"></Search>
    </div>
    <div class="content">
      <div class="total">
        <!-- 汇总信息 -->
        <h3>标准信息</h3>
        <Table  border :columns="listTitle1" :data="datalist1" size="small" :width="tableWidth2" stripe></Table>
      </div>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SG/WdSdSearch.vue'
export default {
  data () {
    return {
      mUserID: '',
      mItemID: '',
      tableWidth2: '1200',
      datacurve1: null,
      firstDevID: null,
      listTitle1: [
        {
          title: '开始时间',
          key: 'SpeedAver'
        },
        {
          title: '结束时间',
          key: 'mDevSDBZ'
        },
        {
          title: '桩号范围',
          key: 'mDevSDSX'
        },
        {
          title: '里程',
          key: 'mDevSDXX'
        }
      ],
      datalist1: []
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.mItemID = this.$store.state.itemInfo.id
    // this.getData()
  },
  watch: {
    firstDevID: {
      handler (newV, oldV) {
        let obj = {
          mDevID: newV
        }
        this.getData(obj)
      }
    }
  },
  methods: {
    getDevID (e) {
      console.log(e)
      this.firstDevID = e
    },
    getData (emitobj) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
        obj = { ...obj, ...this.emitobj }
      }
      console.log(obj)
      this.comFun.post('/Locus/getDevTempSpeedData', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理list1
          let listArr1 = []
          listArr1.push(rs.data.static_data)
          this.datalist1 = listArr1
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    }
  },
  components: {
    Search
  }
}
</script>
