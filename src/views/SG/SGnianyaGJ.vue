<style lang="less" scoped>

.content{
  padding:.2rem .4rem;
}
  .chart{
    height:1.6rem;
  }
  .move{
    height: 4.2rem;
  }
</style>
<template>
<!-- 施工--碾压--轨迹（重复遍数） -->
  <div>
    <div class="search">
      <!-- 条件 -->
      <Search v-on:getData="getData"></Search>
    </div>
    <div class="content">
      <BarChart :id="'bar1'" :data="dataBar1" class = "chart"></BarChart>
      <Move class="move" :id="'move1'" :data="movedata" @updata-barchart="getTimesChart"></Move>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SC/WarnSearch.vue'
import BarChart from '@/components/BarChart.vue'
import Move from '@/components/Move1.vue'
export default {
  data () {
    return {
      mUserID: '',
      mItemID: '',
      emitobj: {},
      movedata: null,
      dataBar1: null
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.mItemID = this.$store.state.itemInfo.id
    this.getData()
  },
  methods: {
    getData (emitobj) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        // 碾压1，摊铺2
        devType: 1
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
        obj = { ...obj, ...this.emitobj }
      }
      console.log(obj)
      this.comFun.post('/Locus/nyData', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 包括碾压和道路坐标
          this.movedata = rs
        } else {
        }
      }, (err) => { console.log(err) })
    },
    // 从子组件得到数据，更新barchart
    getTimesChart (emit) {
      console.log(emit)
      // emit是柱状图数组
      let xdata = []
      emit.map((item, index, arr) => {
        xdata.push(index + 1 + '遍')
      })
      this.dataBar1 = this.handleBarData(emit, xdata)
    },
    // 处理柱状图数据
    handleBarData (ydata, xdata) {
      console.log(xdata, ydata)
      let xAxisdata = xdata
      let option = {
        color: ['#6996F3'],
        textStyle: {
          color: '#666'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '5%',
          left: '1%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisdata,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: true, lineStyle: { color: ['#aaa'], type: 'dashed' } }, // 网格线
            axisLabel: {
              formatter: function (ydata) {
                return ydata + '%'
              }
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '50%',
            data: ydata
          }
        ]
      }
      return option
    }
  },
  components: {
    Search,
    Move,
    BarChart
  }
}
</script>
