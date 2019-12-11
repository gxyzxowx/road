<style scoped>
  .chart{
    height: 100%;
  }
</style>
<template>
  <div class="chart" v-bind:id=id v-bind:data=data>

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chartCurve: null
    }
  },
  props: ['id', 'data'],
  //  深度监听 父组件刚开始没有值，只有图标的配置项
  //  父组件ajax请求后改变数据的值，传递过来，图标已生成，监听传过来的值的改变
  watch: {
    data: {
      handler (newVal, oldVal) {
        // console.log(this.data)
        this.drawCurve(this.id, newVal)
      }
    },
    deep: true
  },
  methods: {
    drawCurve (id, data) {
      let myChart = echarts.init(document.getElementById(id))
      let option = data
      this.chartCurve = myChart.setOption(option, true)
    }
  },
  mounted () {
    // option = {
    //     xAxis: {
    //         type: 'category',
    //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //     },
    //     yAxis: {
    //         type: 'value'
    //     },
    //     series: [{
    //         data: [820, 932, 901, 934, 1290, 1330, 1320],
    //         type: 'line',
    //         smooth: true
    //     }]
    // };
  },
  beforeDestroy () {
    if (this.chartCurve) {
      this.chartCurve.clear()
    }
  }
}
</script>
