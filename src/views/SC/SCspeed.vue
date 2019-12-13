    <!-- 进度监管 -->
    <style lang="less" scoped>
    .scspeed{
      padding: .4rem;
    }
      .content{
        .bars{
          .bar{
            margin-top: .3rem;
            height: 3rem;
            // background: red
          }
        }
      }
    </style>
<template>
  <div class="scspeed">
    <!-- 条件 -->
      <Search></Search>

    <div class="content">
      <div class="bars">
        <div class="bar">
          <h4>总量各层面产量柱状图</h4>
          <BarChart :id="'bar1'" :data="dataBar1" class = "chart"></BarChart>
        </div>
        <div class="bar">
          <h4>各种矿料总柱状图</h4>
          <BarChart :id="'bar2'" :data="dataBar2" class = "chart"></BarChart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from '@/components/SC/WarnSearch.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  data () {
    return {
      dataBar1: null,
      dataBar2: null
    }
  },
  components: {
    Search,
    BarChart
  }
}
</script>
