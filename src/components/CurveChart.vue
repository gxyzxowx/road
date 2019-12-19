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
    // console.log(this.data)
    // console.log(this.id)
    // let option = {
    //   title: {
    //     text: '折线图堆叠'
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       name: '邮件营销',
    //       type: 'line',
    //       stack: '总量',
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: '联盟广告',
    //       type: 'line',
    //       stack: '总量',
    //       data: [220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //       name: '视频广告',
    //       type: 'line',
    //       stack: '总量',
    //       data: [150, 232, 201, 154, 190, 330, 410]
    //     },
    //     {
    //       name: '直接访问',
    //       type: 'line',
    //       stack: '总量',
    //       data: [320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //       name: '搜索引擎',
    //       type: 'line',
    //       stack: '总量',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     }
    //   ]
    // }
  },
  beforeDestroy () {
    if (this.chartCurve) {
      this.chartCurve.clear()
    }
  }
}
</script>
