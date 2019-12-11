<style scoped>
  .chart2{
    height: 100%;
  }
</style>
<template>
  <div class="chart2" v-bind:id=id v-bind:data=data>

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chartBar: null
    }
  },
  props: ['id', 'data'],
  //  深度监听 父组件刚开始没有值，只有图标的配置项
  //  父组件ajax请求后改变数据的值，传递过来，图标已生成，监听传过来的值的改变
  watch: {
    data: {
      handler (newVal, oldVal) {
        // console.log(this.data)
        this.drawBar(this.id, newVal)
      }
    },
    deep: true
  },
  methods: {
    drawBar (id, data) {
      let myChart = echarts.init(document.getElementById(id))
      let option = data
      this.chartBar = myChart.setOption(option, true)
    }
  },
  mounted () {
    // let myChart = echarts.init(document.getElementById('chart2'))
    // let option = {
    //   color: ['#3398DB'],
    //   textStyle: {
    //     color: '#9FC9F7'
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //       type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //     }
    //   },
    //   grid: {
    //     top: '3%',
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //       axisTick: {
    //         alignWithLabel: true
    //       }
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value',
    //       splitLine: { show: true, lineStyle: { color: ['#333'] } } // 网格线
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '直接访问',
    //       type: 'bar',
    //       barWidth: '60%',
    //       data: [10, 52, 200, 334, 390, 330, 220]
    //     }
    //   ]
    // }
    // myChart.setOption(option)
  },
  beforeDestroy () {
    if (this.chartBar) {
      this.chartBar.clear()
    }
  }
}
</script>
