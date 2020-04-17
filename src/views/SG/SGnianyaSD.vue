<!--
 * @Date         : 2019-12-25 11:05:22
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-04-14 10:16:38
 * @FilePath     : \road\src\views\SG\SGnianyaSD.vue
 -->
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
<!-- 施工--碾压--速度 -->
  <div>
    <div class="search">
      <!-- 条件 -->
      <!-- 碾压机211，摊铺机210 -->
      <!-- 传递搜索条件devType=211碾压机 -->
      <Search v-on:getData="getData" devType="211" @mDevID="getDevID"></Search>
    </div>
    <div class="content">
      <div class="total">
        <!-- 汇总信息 -->
        <h3>标准信息</h3>
        <Table  border :columns="listTitle1" :data="datalist1" size="small" :width="tableWidth2" stripe :loading="loading"></Table>
      </div>
      <div class="curve">
        <h3>速度曲线图</h3>
        <!-- 速度曲线 -->
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SG/WdSdSearch.vue'
import CurveChart from '@/components/CurveChart.vue'
// data和method来源
import SGsuduData from '@/data/SGsudu.js'
export default {
  data () {
    return {

    }
  },
  mixins: [SGsuduData],
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
  },
  components: {
    Search,
    CurveChart
  }
}
</script>
